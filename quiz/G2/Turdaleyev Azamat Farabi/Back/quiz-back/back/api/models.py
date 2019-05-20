from django.db import models
from django.contrib.auth.models import User


class Contact(models.Model):
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return '{}: {}'.format(self.name,self.phone)

    def to_json(self):
        return {
            'name': self.name,
            'phone': self.phone,
        }