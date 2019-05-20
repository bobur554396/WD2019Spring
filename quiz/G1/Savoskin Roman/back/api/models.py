import datetime

from django.contrib.auth.models import User
from django.utils import timezone
from django.db import models

# Create your models here.


class ContactManager(models.Manager):
    def for_user_order_by_name(self, user):
        return self.filter(created_by=user)


class Contact(models.Model):
    objects = ContactManager()

    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'phone': self.phone
        }
