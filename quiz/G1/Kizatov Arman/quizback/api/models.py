from django.db import models
from django.contrib.auth.models import User


class ContactManager(models.Manager):
    def for_user(self,user):
        return self.filter(created_by=user)


class Contact(models.Model):
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    objects = ContactManager()