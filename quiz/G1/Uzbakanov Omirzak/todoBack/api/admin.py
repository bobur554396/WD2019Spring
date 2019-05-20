from django.contrib import admin
from quiz.api import Contact, ContactList
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token

# Register your models here.

admin.site.register(Contact)
admin.site.register(ContactList)
