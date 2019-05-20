from django.db import models
from django.utils.timezone import now


class Contact(models.Model):
    name = models.CharField(max_length=200)
    phone = models.IntegerField(max_length=11)
