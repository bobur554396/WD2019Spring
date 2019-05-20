"""
WSGI config for quiz_back project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'quiz_back.settings')

application = get_wsgi_application()

from django.views.decorators.csrf import csrf_exempt
from api.serializers import PostSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.models import Post


@csrf_exempt
def putLike(request, pk):
    if request.method == 'PUT':
        try:
            post = Post.objects.get(id=pk)
        except Post.DoesNotExist as e:
            raise Response(status = status.HTTP_404_NOT_FOUND)
        post.like_count += 1
        post.save()
        return Response(status=status.HTTP_200_OK)
    return Response({"error":"bad request"})