from django.db import models
from django.contrib.auth.models import User

# Create your models here.

# class Post_List(models.Model):
#     name=models.CharField(max_length=200)
#
#     def to_json(self):
#         return{
#             'id':self.id,
#             'name':self.name
#         }

# class Post(models.Model):
#     title=models.CharField(max_length=200)
#     body=models.TextField()
#     like_count=models.IntegerField(default=0)
#     created_at=models.DateTimeField(auto_now_add=True)
#     # created_by=models.ForeignKey(User,on_delete=models.CASCADE)
#
#     def __str__(self):
#         return '{}: {}, {}'.format(self.id, self.title)
#
#     def to_json(self):
#         return {
#             'id':self.id,
#             'title': self.title,
#             'created_at': self.created_at,
#             'like_count': self.like_count,
#             # 'created_by': self.created_by
#         }

class Contact(models.Model):
    name=models.CharField(max_length=200)
    phone=models.CharField(max_length=200)
    created_by=models.ForeignKey(User,on_delete=models.CASCADE)

    def __str__(self):
        return '{}:{},{},{}'.format(self.id,self.name,self.phone,self.created_by)

    def to_json(self):
        return {
            'id':self.id,
            'name':self.name,
            'phone':self.phone,
            'created_by':self.created_by
        }