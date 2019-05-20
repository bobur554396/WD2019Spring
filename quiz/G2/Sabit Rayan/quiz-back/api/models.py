from django.db import models
from django.contrib.auth.models import User

#
# class Post(models.Model):
#     title = models.CharField(max_length=50)
#     body = models.TextField()
#     like_count = models.IntegerField(default=0)
#     created_at = models.DateTimeField()
#     created_by = models.ForeignKey(User, on_delete=models.CASCADE, default=None, null=True)

class Contact(models.Model):
   name = models.CharField(max_length=200)
   phone = models.CharField(max_length=200)
   created_by = models.ForeignKey(User, on_delete=models.CASCADE, default=None, null=True)

# Create your models here.
