from django.db import models
from django.contrib.auth.models import User

class Contact(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    phone = models.CharField(max_length=50)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, default=None, null=True)

    def __str__(self):
        return '{}:{}'.format(self.id, self.name)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }
