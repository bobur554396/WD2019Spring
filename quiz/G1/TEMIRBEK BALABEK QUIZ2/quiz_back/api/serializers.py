from rest_framework import serializers
from api.models import Contacts

class ContactsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Contacts
        fields = ('id', 'name', 'phone')
