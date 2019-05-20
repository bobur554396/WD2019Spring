from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class ContactsManager(models.Manager):
    def for_user_order_by_name(self, user):
        return self.filter(created_by=user).order_by('name')


class Contacts(models.Model):
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    objects = ContactsManager()
