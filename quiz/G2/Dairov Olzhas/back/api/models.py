from django.db import models
from django.contrib.auth.models import User

class Contact(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, default=None, null=True)
# Create your models here.
