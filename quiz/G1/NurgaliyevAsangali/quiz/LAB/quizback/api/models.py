from django.db import models
from datetime import datetime
from django.contrib.auth.models import User


# Create your models here.

class Contact(models.Model):
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    