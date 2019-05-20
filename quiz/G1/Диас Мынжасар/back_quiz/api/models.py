from django.db import models
from django.contrib.auth.models import User 

class Contact(models.Model):
	name=models.CharField(max_length=200)
	phone=models.CharField(max_length=200)
	created_by=models.ForeignKey(User, on_delete=models.CASCADE, default=None, null=True)

	def __str__ (self):
		return '{}:{}'.format(self.name, self.created_by)

	def to_json(self):
		return{
		'name':self.name,
		'phone':self.phone,
		'created by':self.created_by
		}