from django.contrib import admin
from api.models import Post
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token

admin.site.register(PostList)
admin.site.register(Post)

