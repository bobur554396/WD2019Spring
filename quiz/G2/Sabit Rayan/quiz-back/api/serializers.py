from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import Contact

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email'
        ]



class ContactSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    # title = serializers.CharField()
    # body = serializers.CharField()
    # like_count = serializers.IntegerField()
    # created_at = serializers.DateField()
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Contact
        fields = [
            'id',
            # 'title',
            # 'body',
            # 'like_count',
            # 'created_at',
            'name'
            'phone'
            'created_by'
        ]


