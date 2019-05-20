from django.db import models
from django.db import transaction

from django.contrib.auth.models import User
class Contact(models.Model):

    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return '{}: {}'.format(self.id, self.name)
