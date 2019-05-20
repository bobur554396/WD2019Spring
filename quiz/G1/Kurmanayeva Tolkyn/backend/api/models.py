from django.db import models
from django.contrib.auth.models import User




class Contact(models.Model):
    name = models.CharField(max_length=200, default='')
    phone = models.CharField(max_length=1000, default='')


