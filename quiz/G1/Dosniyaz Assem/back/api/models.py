from django.db import models
from django.contrib.auth.models import User

class Contact(models.Model):
    name = models.CharField(max_length=250)
    phone = models.CharField(max_length=250)
    created_by = models.ForeignKey(User,on_delete=models.CASCADE,default=1)
