from django.db import models
from django.contrib.auth.models import User

class ContactManager(models.Manager):
    def for_user(self, user):
        return self.filter(created_by=user)

class Contact(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=12)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, default=None, null=True)

    objects = ContactManager()

    class Meta:
        verbose_name = 'Contact'
        verbose_name_plural = 'Contacts'

    def __str__(self):
        return f'{self.name} - {self.phone}'
