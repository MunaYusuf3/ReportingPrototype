from django.contrib import admin
from .models import ReportedAccount, ContentItem, Report
# Register your models here.

admin.site.register(ReportedAccount)
admin.site.register(ContentItem)
admin.site.register(Report)

