from django.test import TestCase
from rest_framework.test import APIClient
from reports.models import Report, ReportedAccount
class SubmitReportViewTest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.valid = {
            "platform": "instagram",
            "username": "testuser",
            "content_id": "1",
            "category": "harassment_or_bullying",
            "content_type": "post",
            "text": "this is bad post",
            "description": "test",
            "reporter_id": ""
        }

    def test_valid_report_returns_201(self):
        response = self.client.post("/api/reports/submit/", self.valid, format="json")
        self.assertEqual(response.status_code, 201)

    def test_missing_fields_returns_400(self):
        response = self.client.post("/api/reports/submit/", {"platform": "instagram"}, format="json")
        self.assertEqual(response.status_code, 400)

    def test_report_saved_to_database(self):
        self.client.post("/api/reports/submit/", self.valid, format="json")
        self.assertEqual(Report.objects.count(), 1)

    def test_report_has_correct_category(self):
        self.client.post("/api/reports/submit/", self.valid, format="json")
        self.assertEqual(Report.objects.first().category, "harassment_or_bullying")

    def test_account_created_on_first_report(self):
        self.client.post("/api/reports/submit/", self.valid, format="json")
        self.assertTrue(ReportedAccount.objects.filter(username="testuser").exists())

    def test_account_escalates_after_3_reports(self):
        for i in range(3):
            count = self.valid.copy()
            count["content_id"] = f"post_00{i}"
            self.client.post("/api/reports/submit/", count, format="json")
        account = ReportedAccount.objects.get(username="testuser")
        self.assertEqual(account.status, "under_review")

    def test_soft_report_saves_correctly(self):
        content = self.valid.copy()
        content["category"] = "soft_report"
        self.client.post("/api/reports/submit/", content, format="json")
        self.assertEqual(Report.objects.first().category, "soft_report")

    def test_response_contains_report_id(self):
        response = self.client.post("/api/reports/submit/", self.valid, format="json")
        self.assertIn("report_id", response.data)