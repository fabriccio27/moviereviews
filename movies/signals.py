from django.dispatch import receiver
from django.conf import settings
from django.db.models.signals import post_save

from .models import Watchlist

User = settings.AUTH_USER_MODEL
@receiver(post_save, sender=User)
def post_save_user_model(sender, instance, created, *args,**kwargs):
    if created:
        try:
            Watchlist.objects.create(user=instance)
        except:
            raise ValidationError("Something went wrong :( ")



