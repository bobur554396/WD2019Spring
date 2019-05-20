from django.db import models
from django.contrib.auth.models import User

class Contact(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, default=None, null=True)

    def __str__(self):
        return '{}: {}'.format(self.id, self.name, self.phone)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'phone': self.phone,
        }


# Create your models here.
