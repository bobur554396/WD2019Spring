from django.db import models
from django.contrib.auth.models import User

class userr(models.Manager):
    def for_user(self, user):
        return self.filter(created_by=user)

class Contacts(models.Model):
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    objects = userr()

    def __str__(self):
        return '{}: {}'.format(self.id, self.name)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'phone': self.phone,
            'created_by': self.created_by,
        }