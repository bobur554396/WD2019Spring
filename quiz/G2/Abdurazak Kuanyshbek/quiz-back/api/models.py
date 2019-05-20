from django.db import models
from django.contrib.auth.models import User



class ContactManager(models.Manager):
    def for_user(self, user):
        return self.filter(created_by=user)

# Create your models here.
class Contact(models.Model):
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, default=2)
    objects = ContactManager()

    class Meta:
        verbose_name = 'Contact'
        verbose_name_plural = 'Contacts'

    def __str__(self):
        return '{}: {}'.format(self.id, self.name, self.phone, self.created_by)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'phone': self.phone
        }
