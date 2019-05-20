from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    like_count = models.IntegerField()
    created_at = models.DateTimeField()
    name = models.CharField(max_length=200, default=22)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return '{}: {}'.format(self.id, self.name)

    def to_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'like_count': self.like_count,
            'count': self.count,
            'created_at': self.created_at,
            'name': self.name
        }
