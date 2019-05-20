from django.db import models
import datetime
from datetime import timedelta
from django.contrib.auth.models import User


class ContactList(models.Model):
    name = models.CharField(max_length = 255)

    def __str__(self):
        return '{}: {}'.format(self.id, self.name)

class Contact(models.Model):
    name = models.CharField(max_length = 255)
    phone = models.CharField(max_length=255)
    created_by = models.ForeignKey(User,on_delete=models.CASCADE)
    contact_list = models.ForeignKey(ContactList, on_delete=models.CASCADE,
                                  related_name='contacts')

    def __str__(self):
        return '{}: {}'.format(self.id, self.name,self.phone)

