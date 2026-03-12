from django.db import models

# Create your models here.

# store reported accounts
class ReportedAccount(models.Model):
    PLATFORM_CHOICES = [
        ("instagram", "Instagram"),
        ("whatsapp", "WhatsApp")
    ]
    STATUS_CHOICES = [
        ("active", "Active"), # no action taken yet
        ("under_review", "Under Review"), # moderators are checking
        ("actioned", "Actioned") # moderator action taken
    ]

    username = models.CharField(max_length=100)
    platform = models.CharField(max_length=50, choices= PLATFORM_CHOICES)
    status = models.CharField(max_length=30,choices=STATUS_CHOICES,default="active")

    class Meta:
        unique_together = ("platform", "username")

    def __str__(self):
        return self.username

# store harmful content types
class ContentItem(models.Model):
    CONTENT_TYPE_CHOICES = [
        ("message", "Message"),
        ("post", "Post"),
        ("comment", "Comment")
    ]

    content_id = models.CharField(max_length=100, unique=True)
    content_type = models.CharField(max_length=30,choices=CONTENT_TYPE_CHOICES,default="message")
    text = models.TextField(blank=True)
    reported_account = models.ForeignKey(
        ReportedAccount,
        on_delete=models.CASCADE,
        related_name="content_items"
    )

    def __str__(self):
        return f"{self.content_type} - {self.content_id}"

# store report submission choices
class Report(models.Model):
    CATEGORY_CHOICES = [ #from figma prototype
        ("harassment_or_bullying", "Harassment or Bullying"), 
        ("hate_or_discrimination", "Hate or Discrimination"),
        ("threats_or_intimidation", "Threats or Intimidation"),
        ("misinformation", "False or misleading information"),
        ("scams_or_impersonation", "Scams or impersonation"),
        ("sexual_content", "Non-consensual or Sexual Content"),
        ("something_else", "Other"),
    ]

    STATUS_CHOICES = [
        ("submitted", "Submitted"),
        ("under_review", "Under Review"),
        ("resolved", "Resolved"),
        ("rejected", "Rejected"),
    ]

    reporter_id = models.CharField(max_length=100, blank=True, null= True)
    content_item = models.ForeignKey(ContentItem,on_delete=models.CASCADE,related_name="reports")
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default="submitted")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.category} - {self.content_item.content_id}"