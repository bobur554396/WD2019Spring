from django.shortcuts import render
from rest_framework import generics
from api.models import Contact
from api.serializers import PostSerializer
from rest_framework.permissions import IsAuthenticated


class ContactListView(generics.ListCreateAPIView):
    queryset = list.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        return Contact.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)



# Create your views here.


