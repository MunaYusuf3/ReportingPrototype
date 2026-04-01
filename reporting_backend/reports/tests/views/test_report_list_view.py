from django.test import TestCase
from rest_framework.test import APIClient
from reports.models import ReportedAccount, ContentItem, Report


class ReportListViewTest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.account = ReportedAccount.objects.create(username="testuser",platform="instagram")
        self.item = ContentItem.objects.create(
            content_id="post_001",
            content_type="post",
            text="some text",
            reported_account=self.account
        )

    def test_returns_200(self):
        response = self.client.get("/api/reports/")
        self.assertEqual(response.status_code, 200)

    def test_returns_empty_list_when_no_reports(self):
        response = self.client.get("/api/reports/")
        self.assertEqual(response.data, [])

    def test_returns_reports(self):
        Report.objects.create(
            content_item=self.item,
            category="harassment_or_bullying"
        )
        response = self.client.get("/api/reports/")
        self.assertEqual(len(response.data), 1)

    def test_reports_ordered_by_most_recent(self):
        Report.objects.create(content_item=self.item, category="harassment_or_bullying")
        Report.objects.create(content_item=self.item, category="misinformation")
        response = self.client.get("/api/reports/")
        self.assertEqual(response.data[0]["category"], "misinformation")