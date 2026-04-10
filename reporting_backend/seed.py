import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "reporting_backend.settings")
django.setup()

from reports.models import ReportedAccount, ContentItem

ContentItem.objects.all().delete()
ReportedAccount.objects.all().delete()

# accounts
ig_user1 = ReportedAccount.objects.create(username="susan", platform="instagram")
ig_user2 = ReportedAccount.objects.create(username="bob", platform="instagram")
ig_user3 = ReportedAccount.objects.create(username="lucy", platform="instagram")
wa_user1 = ReportedAccount.objects.create(username="alex", platform="whatsapp")
wa_user2 = ReportedAccount.objects.create(username="mia", platform="whatsapp")
wa_user3 = ReportedAccount.objects.create(username="tony", platform="whatsapp")

# content items
ContentItem.objects.create(content_id="ig1", content_type="post", text="You are absolutely disgusting and everyone knows it. Just disappear already.", reported_account=ig_user1)
ContentItem.objects.create(content_id="wa1", content_type="message", text="Urgent: send your bank details now to claim your prize. This offer expires in 24 hours.", reported_account=wa_user1)
ContentItem.objects.create(content_id="ig2", content_type="post", text="Keep sending me messages like that and you'll regret it. I know where you work.", reported_account=ig_user1)
ContentItem.objects.create(content_id="wa2", content_type="message", text="I know where you live and I know your routine. You should be more careful.", reported_account=wa_user1)
ContentItem.objects.create(content_id="ig3", content_type="post", text="People like you don't deserve to exist in this country. Go back to where you came from.", reported_account=ig_user2)
ContentItem.objects.create(content_id="wa3", content_type="message", text="Send me those photos or I will share the ones I already have with everyone you know.", reported_account=wa_user2)
ContentItem.objects.create(content_id="ig4", content_type="post", text="This so called charity is a complete scam. Don't give them a single penny, they are liars.", reported_account=ig_user2)
ContentItem.objects.create(content_id="wa4", content_type="message", text="I am your bank calling about a suspicious transaction. Please confirm your account number and sort code immediately.", reported_account=wa_user1)
ContentItem.objects.create(content_id="ig5", content_type="post", text="Scientists have proven that the vaccine contains microchips. Share this before they take it down.", reported_account=ig_user3)
ContentItem.objects.create(content_id="wa5", content_type="message", text="You have been harassing me for weeks and I am warning you to stop or you will regret it.", reported_account=wa_user2)
ContentItem.objects.create(content_id="ig6", content_type="post", text="I have your address. Next time you post something like that I will come and find you.", reported_account=ig_user1)
ContentItem.objects.create(content_id="wa6", content_type="message", text="People from your background are all the same. You will never fit in here no matter what you do.", reported_account=wa_user3)
ContentItem.objects.create(content_id="ig7", content_type="post", text="Nobody likes you and everyone in the group chat is laughing at you right now.", reported_account=ig_user2)
ContentItem.objects.create(content_id="wa7", content_type="message", text="Hi I am from HMRC. You owe unpaid tax and will be arrested today unless you pay immediately via gift card.", reported_account=wa_user1)
ContentItem.objects.create(content_id="ig8", content_type="post", text="Women like her shouldn't be allowed to have opinions. Somebody needs to put her in her place.", reported_account=ig_user3)
ContentItem.objects.create(content_id="wa8", content_type="message", text="I have been sending you messages every day because I need you to understand how much you hurt me. You owe me a response.", reported_account=wa_user2)
ContentItem.objects.create(content_id="ig9", content_type="post", text="The government is hiding the truth about this. Wake up people, do your research.", reported_account=ig_user2)
ContentItem.objects.create(content_id="wa9", content_type="message", text="Everyone in the group has been talking about you. They all think the same thing about you that I do.", reported_account=wa_user3)
ContentItem.objects.create(content_id="ig10", content_type="post", text="I will make sure everyone knows what you did. Your reputation is finished.", reported_account=ig_user3)
ContentItem.objects.create(content_id="wa10", content_type="message", text="Your parcel could not be delivered. Click this link and pay the fee within 12 hours or it will be returned.", reported_account=wa_user1)

print("Seeded successfully")