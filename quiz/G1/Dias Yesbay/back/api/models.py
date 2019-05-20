from django.db import models
from django.contrib.auth.models import User
from rest_framework import serializers


# Create your models here.
class ContactManager(models.Manager):
    def for_user(self, user):
        return self.filter(owner=user)

class Contact ( models.Model ) :
    name = models.CharField(max_length=50)
    phone = models.IntegerField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    objects = ContactManager()