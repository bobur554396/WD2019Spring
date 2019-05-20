from django.contrib.auth.models import User
from django.db import models

# Create your models here.



class Contact(models.Model):
    name=models.CharField(max_length=20)
    phone=models.CharField(max_length=20)
    created_by=models.ForeignKey(User,default=1,on_delete=models.CASCADE)
