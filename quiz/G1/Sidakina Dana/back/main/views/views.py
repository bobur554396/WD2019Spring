
from django.contrib.auth.models import User
from django.http import Http404
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from ..models import Contact
from ..serializers import ContactSerializer,ContactSerializerForModification,ContactSerializer2
# from ..serializers import PostSerializer,UserSerializer,PostSerializer2,PostSerializer3
#
#
# class PostCreateOrShow(generics.ListCreateAPIView):
#     # permission_classes = (IsAuthenticated,)
#     serializer_class = PostSerializer
#     queryset = Post.objects.all()
#
#
# class PostDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer2
#
# @api_view(['POST',])
# def like_increment(request,pk):
#     try:
#         post = Post.objects.get(id=pk)
#     except Post.DoesNotExist:
#         return Http404
#
#     post.like_count=post.like_count+1
#     serializer=PostSerializer3(instance=post,data=post.to_json())
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data,status=status.HTTP_200_OK)
#
#     return Response(serializer.errors)

class ContactCreateOrShow(generics.ListCreateAPIView):
    # permission_classes = (IsAuthenticated,)
    queryset = Contact.objects.all()
    serializer_class =ContactSerializer

class ContactCreate(generics.CreateAPIView):
    # permission_classes = (IsAuthenticated,)
    queryset = Contact.objects.all()
    serializer_class =ContactSerializer2


class ContactDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializerForModification





