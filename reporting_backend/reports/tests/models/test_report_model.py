from django.test import TestCase
from reports.models import ReportedAccount, ContentItem, Report


class ReportModelTest(TestCase):

    def setUp(self):
        self.account = ReportedAccount.objects.create(username="testuser",platform="instagram")
        self.item = ContentItem.objects.create(
            content_id="post_001",
            content_type="post",
            text="some text",
            reported_account=self.account
        )
        self.report = Report.objects.create(
            content_item=self.item,
            category="harassment_or_bullying"
        )

    def test_str(self):
        self.assertEqual(str(self.report), "harassment_or_bullying – post_001")

    def test_is_submitted(self):
        self.assertEqual(self.report.status, "submitted")