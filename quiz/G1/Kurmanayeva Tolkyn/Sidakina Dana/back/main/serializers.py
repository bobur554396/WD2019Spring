from rest_framework import serializers
from .models import Contact
from django.contrib.auth.models import User

# class PostListSerializer(serializers.ModelSerializer):
#     id=serializers.IntegerField(read_only=True)
#     title=serializers.CharField(required=True)
#
#     class Meta:
#         model=Post_List
#         fields=(
#             'id',
#             'name',
#         )

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email',)


#
# class PostSerializer(serializers.ModelSerializer):
#     title=serializers.CharField(required=True)
#     body=serializers.CharField(required=True)
#     # like_count=serializers.IntegerField(default=0)
#     # created_at=serializers.DateTimeField(read_only=True)
#     # created_by=UserSerializer(User)
#     class Meta:
#         model = Post
#         fields = ('id','title','body')



# class PostSerializer2(serializers.ModelSerializer):
#     title=serializers.CharField(required=True)
#     like_count=serializers.IntegerField()
#     created_at=serializers.DateTimeField()
#     # created_by=UserSerializer(User)
#     class Meta:
#         model = Post
#         fields = '__all__'
#
# class PostSerializer3(serializers.ModelSerializer):
#     title = serializers.CharField(read_only=True)
#     body=serializers.CharField(read_only=True)
#     like_count = serializers.IntegerField(required=True)
#     created_at = serializers.DateTimeField(read_only=True)
#     # created_by = UserSerializer(User,read_only=True)
#
#     class Meta:
#         model = Post
#         fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    name=serializers.CharField(required=True)
    phone=serializers.CharField(required=True)
    created_by=UserSerializer(User)
    class Meta:
        model=Contact
        fields='__all__'


class ContactSerializer2(serializers.ModelSerializer):
    name=serializers.CharField(required=True)
    phone=serializers.CharField(required=True)
    class Meta:
        model=Contact
        fields='__all__'



class ContactSerializerForModification(serializers.ModelSerializer):
    name=serializers.CharField(required=True)
    phone=serializers.CharField(required=True)
    created_by=UserSerializer(User,read_only=True)
    class Meta:
        model=Contact
        fields='__all__'

