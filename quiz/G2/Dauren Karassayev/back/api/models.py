from django.db import models
from django.contrib.auth.models import User


class CategoryManager(models.Manager):
    def for_user(self, user):
        return self.filter(created_by=user)


class Contact(models.Models):
    name = models.CharField(max_length = 200)
    phone = models.CharField(max_length = 200)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, default=2)
    objects = CategoryManager()
	class Meta:
		verbose_name = 'Contact'
		verbose_name_plural = 'Contacts'
	def __str__(self):
		return '{}: {}'.format(self.name, self.phone)

	def to_json(self):
		return {
			'id': self.name,
			'name': self.phone
		}