from django.test import TestCase
from reports.models import ReportedAccount, ContentItem


class ContentItemModelTest(TestCase):

    def setUp(self):
        self.account = ReportedAccount.objects.create(username="testuser",platform="instagram")
        self.item = ContentItem.objects.create(
            content_id="post_001",
            content_type="post",
            text="some text",
            reported_account=self.account
        )

    def test_str(self):
        self.assertEqual(str(self.item), "post – post_001")

    def test_default_is_message(self):
        item = ContentItem.objects.create(
            content_id="post_002",
            reported_account=self.account
        )
        self.assertEqual(item.content_type, "message")