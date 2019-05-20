from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Contact(models.Model):
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, default=2)

    def __str__(self):
        return '{} {}: {}'.format(self.id, self.name, self.phone)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'phone': self.phone,
            'created_by': self.created_by
        }