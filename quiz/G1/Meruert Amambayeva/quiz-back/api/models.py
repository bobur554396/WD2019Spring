from django.db import models

from django.contrib.auth.models import User
from django.db import models



class Contact(models.Model):
    name=models.CharField(max_length=100)
    phone = models.CharField(max_length=10)
    created_by=models.ForeignKey(User,on_delete=models.CASCADE,default=1)