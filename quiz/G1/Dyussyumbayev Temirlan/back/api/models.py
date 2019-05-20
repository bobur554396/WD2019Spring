from django.db import models
from datetime import datetime
from django.contrib.auth.models import User

class Contacts(models.Model):
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)