from rest_framework import serializers
from demo.api.models import Contact
from django.contrib.auth.models import User

class ContactSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    class Meta:
        model = Contact
        fields ='__all__'