from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class ContactManager(models.Manager):
    def for_user(self, user):
        self.filter(created_by = user).order_by('name')

class Contact(models.Model):
    name = models.CharField(max_length = 255)
    phone = models.CharField(max_length = 255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
