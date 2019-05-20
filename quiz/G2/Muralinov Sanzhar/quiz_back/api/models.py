from django.db import models

# Create your models here.
class Contact(models.Model):
    id = models.IntegerField(max_length=200)
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)

    def _str_(self):
        return'{}: {}'.format(self.id, self.name, self.phone)

    def to_json(self):
        return{
            'id': self.id,
            'name': self.name,
            'phone': self.phone
        }