from rest_framework import serializers
from .models import Report, ContentItem, ReportedAccount

class ReportedAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportedAccount
        fields = "__all__"

class ContentItemSerializer(serializers.ModelSerializer):
    reported_account = ReportedAccountSerializer(read_only=True)

    class Meta:
        model = ContentItem
        fields = "__all__"

class ReportSerializer(serializers.ModelSerializer):
    content_item = ContentItemSerializer(read_only=True)

    class Meta:
        model = Report
        fields = "__all__"