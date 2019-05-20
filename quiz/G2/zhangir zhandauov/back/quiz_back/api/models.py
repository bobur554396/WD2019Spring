from django.db import models
from django.contrib.auth.models import User, Group
from rest_framework import routers, serializers, viewsets

class ContactManager(models.Manager):
    def for_user(self, user):
        return self.filter(created_by=user)

class Contact(models.Model):
    name = models.CharField(max_length=200)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, default=2)

    objects = ContactManager()

    class Meta:
        verbose_name = 'Contact'
        verbose_name_plural = 'Contacts'

    def __str__(self):
        return self.name

    def to_json(self):
        return {
            'name': self.name
        }
