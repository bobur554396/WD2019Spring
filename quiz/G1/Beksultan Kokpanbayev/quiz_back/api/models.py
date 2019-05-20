from django.db import models
from django.contrib.auth.models import User


class Contact(models.Model):
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, default=2)

    def __str__(self):
        return '{}: {}'.format(self.id,self.name)

    def to_json(self):
        return {
            'id': self.id,
            'title':self.name,
            'phone':self.phone
        }



