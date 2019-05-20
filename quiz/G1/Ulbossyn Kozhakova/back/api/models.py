from django.db import models
from datetime import datetime, timedelta
from django.contrib.auth.models import User
# Create your models here.


class ContactManager(models.Manager):
    def for_user_order_by_name(self, user):
        return self.filter(created_by=user).order_by('name')


class Contact(models.Model):
    name = models.CharField(max_length=50)
    phone = models.TextField(max_length=50)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, default=2)
    objects = ContactManager()

    class Meta:
        verbose_name = 'Contact'
        verbose_name_plural = 'Contacts'

    def _str_(self):
        return '{}: {}'.format(self.id, self.name)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }
