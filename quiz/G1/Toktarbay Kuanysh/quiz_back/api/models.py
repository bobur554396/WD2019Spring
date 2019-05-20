from django.db import models
from datetime import datetime
from django.contrib.auth.models import User

class Post(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField(max_length=500)
    like_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=datetime.now())
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)