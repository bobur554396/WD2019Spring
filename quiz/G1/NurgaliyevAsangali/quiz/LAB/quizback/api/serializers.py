from rest_framework import serializers
from django.contrib.auth.models import User

from api.models import Post


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class PostSerializer(serializers.ModelSerializer):
    title = serializers.CharField()
    like_count = serializers.IntegerField(read_only=True)
    body = serializers.CharField(required=False)
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'
