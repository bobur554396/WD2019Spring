from django.contrib.auth.models import User
from django.db import models

# Create your models here.

class Contact(models.Model):
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=100)
    created_by = models.ForeignKey(User,  on_delete=models.CASCADE, default=1)



