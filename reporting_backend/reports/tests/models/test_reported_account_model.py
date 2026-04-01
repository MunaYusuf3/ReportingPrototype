from django.test import TestCase
from reports.models import ReportedAccount


class ReportedAccountModelTest(TestCase):

    def setUp(self):
        self.account = ReportedAccount.objects.create(username="testuser",platform="instagram")

    def test_str(self):
        self.assertEqual(str(self.account), "testuser (instagram)")

    def test_default_is_active(self):
        self.assertEqual(self.account.status, "active")