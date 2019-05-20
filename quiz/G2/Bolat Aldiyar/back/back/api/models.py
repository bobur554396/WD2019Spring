from django.db import models
import datetime
from datetime import datetime as dt
from django.contrib.auth.models import User


class Contact(models.Model):
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)

    def to_json(self):
        return{
            'id': self.id,
            'name': self.name,
            'phone': self.phone,
        }