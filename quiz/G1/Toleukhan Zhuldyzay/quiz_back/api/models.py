from django.db import models
from django.contrib.auth.models import Contact



class Contact(models.Model):
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=12)
    created_by = models.ForeignKey(Contact, on_delete=models.CASCADE, default=2)


    def __str__(self):
        return '{}: {}'.format(self.name, self.phone)

    def to_json(self):
        return {
            'name': self.name,
            'phone': self.phone
        }
    