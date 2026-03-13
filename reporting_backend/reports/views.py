from django.shortcuts import render

# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Report, ContentItem, ReportedAccount
from rest_framework.generics import ListAPIView
from .serializers import ContentItemSerializer, ReportSerializer

class SubmitReportView(APIView):

    def post(self, request):
        data = request.data

        platform = data.get("platform")
        username = data.get("username")
        content_id = data.get("content_id")
        category = data.get("category")
        content_type = data.get("content_type", "message")
        text = data.get("text", "")
        description = data.get("description", "")
        reporter_id = data.get("reporter_id", "")

        if not platform or not username or not content_id or not category:
            return Response(
                {"error": "platform, username, content_id, and category are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        #reported account
        account, created_account = ReportedAccount.objects.get_or_create(
            platform=platform,
            username=username,
        )

        if created_account:
            account.status = "active"
            account.save()
        #reported content
        content_item, created_content = ContentItem.objects.get_or_create(
            content_id=content_id,
            defaults={
                "content_type": content_type,
                "text": text,
                "reported_account": account,
            }
        )

        
        #create report
        report = Report.objects.create(
            reporter_id=reporter_id,
            content_item=content_item,
            category=category,
            description=description,
        )

        #if account is reported 3 or more times, automatically moderate that account
        report_count = Report.objects.filter(content_item__reported_account=account).count()

        if report_count >= 3:
            account.status = "under_review"
            account.save()

        response_data = {
            "message": "Report submitted successfully",
            "report_id": report.id,
            "account_status": account.status,
            "report_count": report_count,
        }
        
        
        return Response(response_data, status=status.HTTP_201_CREATED)


class ContentItemListView(ListAPIView):
    def get(self,request):
        items = ContentItem.objects.all()
        serializer = ContentItemSerializer(items, many = True)
        return Response(serializer.data)



class ReportListView(ListAPIView):
    def get(self,request):
        reports = Report.objects.all().order_by("-created_at")
        serializer = ReportSerializer(reports, many = True)
        return Response(serializer.data)