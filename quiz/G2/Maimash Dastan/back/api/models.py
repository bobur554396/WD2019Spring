from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth.models import User




class ContactManager(models.Manager):
    def for_user_order_by_name(self, user):
        return self.filter(created_by=user).order_by('name')

    # def get_today(self, date):
    #     return self.filter(created_at.year=data.year,
    #                     created_at.month = data.month,
    #                     created_at.day = data.day)




class Contact(models.Model):
    name=models.CharField(max_length=50)
    phone=models.CharField(max_length=50)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, default=2)
    objects = ContactManager()
    class Meta:
        verbose_name = 'Contact'
        verbose_name_plural = 'Contacts'
    def __str__(self):
        return '{}: {}'.format(self.name, self.phone)
