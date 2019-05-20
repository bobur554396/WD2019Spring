from django.db import models


class User(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return '{}: {}'.format(self.id, self.name)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }


class Contact(models.Model):
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)
    #created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return '{}: {}'.format(self.id, self.name)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'phone': self.price,
        }