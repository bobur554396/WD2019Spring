from django.shortcuts import render
from django.http import JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from api.models import Post
from api.serializers import PostSerializer


# Create your views here.

class PostList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)

    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(created_by=self.request.user)  # user gets details about post iff he owns it


class PutLike(APIView):
    permission_classes = (IsAuthenticated,)

    def get_object(self, pk):
        try:
            return Post.objects.get(id=pk)
        except Post.DoesNotExist:
            raise Http404

    def post(self, request, pk):
        post = self.get_object(pk)
        post.like_count += 1
        request.data['title'] = post.title
        serializer = PostSerializer(instance=post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
