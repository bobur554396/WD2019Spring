from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Contact(models.Model):
    name = models.CharField(max_length=50)
    phone = models.CharField(max_length=11)
    created_by = models.ForeignKey(User,on_delete=None,null=True)