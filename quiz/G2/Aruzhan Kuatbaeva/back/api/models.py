from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

class Contact(models.Model):
    name = models.CharField(max_length=50)
    phone = models.CharField(max_length=50)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, default=None, null=True)

    def __str__(self):
        return '{}:{}'.format(self.name, self.created_by)

    def to_json(self):
        return {
            'name': self.name,
            'created_by': self.created_by
        }
# Create your models here.
# Post.objects.create(title='Post1', body='body1', like_count=4, created_at=datetime.now())
