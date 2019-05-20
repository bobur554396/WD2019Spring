from django.contrib.auth.models import User
from django.db import models
from datetime import datetime



class ContactsListManager(models.Manager):
    def for_user_order_by_name(self, user):
        return self.filter(created_by=user).order_by('name')

class ContactList(models.Model):
    objects = ContactsListManager()
    name = models.CharField(max_length=100)
    created_by=models.ForeignKey(User,on_delete=models.CASCADE,default=1)

    def __str__(self):
        return self.name

    def to_json(self):
        return{
            'name': self.name,
            'id': self.id,
        }

class Contact(models.Model):
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=100)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    contact_list = models.ForeignKey(ContactList, on_delete=models.CASCADE)
    def __str__(self):
        return '{}: {}'.format(self.phone, self.name)

    def to_json(self):
        return {

            'name': self.name,
            'phone': self.phone,
            'created_by': self.created_by
        }

