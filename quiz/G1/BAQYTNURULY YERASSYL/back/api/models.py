from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Contact(models.Model):
    name = models.CharField(max_length=40)
    phone = models.CharField(max_length=20)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null = True)

    class Meta:
        verbose_name = 'Contact'
        verbose_name_plural = 'Contacts'


    def __str__(self):
        return self.name
