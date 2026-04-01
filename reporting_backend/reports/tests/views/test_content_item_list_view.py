from django.test import TestCase
from rest_framework.test import APIClient
from reports.models import ReportedAccount, ContentItem


class ContentItemListViewTest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.account = ReportedAccount.objects.create(username="testuser",platform="instagram")

    def test_returns_200(self):
        response = self.client.get("/api/content/")
        self.assertEqual(response.status_code, 200)

    def test_returns_empty_list_when_no_content(self):
        response = self.client.get("/api/content/")
        self.assertEqual(response.data, [])

    def test_returns_content_items(self):
        ContentItem.objects.create(
            content_id="post_001",
            content_type="post",
            text="some text",
            reported_account=self.account
        )
        response = self.client.get("/api/content/")
        self.assertEqual(len(response.data), 1)