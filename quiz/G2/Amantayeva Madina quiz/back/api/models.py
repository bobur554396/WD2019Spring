from django.db import models
from django.contrib.auth.models import User
import datetime


class ContactsManager(models.Manager):
    def for_user_order_by_name(self, user):
        return self.filter(created_by=user).order_by('name')

    # def get_today(self, date):
    #     return self.filter(created_at.year=data.year, created_at.month = data.month,created_at.day = data.day,)


class Contacts(models.Model):
    name = models.CharField(max_length=50)
    phone = models.CharField(max_length=50)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    objects = ContactsManager()

    def __str__(self):
        return '{}:{}'.format(self.id, self.name, self.phone)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'phone': self.phone
        }
