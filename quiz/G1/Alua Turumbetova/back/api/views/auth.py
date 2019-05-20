from django.contrib.auth.models import User
from api.serializers import UserSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework import status''


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer



@api_view(['POST'])
def login(request):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data.get('user')
    token, _ = Token.objects.get_or_create(user=user)
    print(token)
    return Response({"token": token.key})

@api_view(['POST'])
def logout(request):
    request.auth.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)