from api.models import Contact
from api.serializers import ContactSerializer2
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework import authtoken

@api_view(['GET','POST'])
def post_list(request):
    if request.method == 'GET':
        posts = Contact.objects.all()
        serializer = ContactSerializer2(posts,many=True)
        return Response(serializer.data,status= status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = ContactSerializer2(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status = status.HTTP_201_CREATED)
        return Response(serializer.errors,status = status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET','PUT','DELETE'])
def post_detail(request,pk):
    try:
        posts = Contact.objects.get(id = pk)
    except Contact.DoesNotExist as e:
        return Response({'error',f'{e}'},status = status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ContactSerializer2(posts)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ContactSerializer2(instance=posts, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    elif request.method == 'DELETE':
        posts.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)





