from api.models import Contact
from api.serializers import ContactSerializer, UserSerializer, UserSerializer2
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework import mixins
from django.contrib.auth.models import User
# from rest_framework.authtoken.models import
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)  #(AllowAny, )

class UserDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer2


@api_view(['POST'])
def UserLogin(request):
    serializer = AuthTokenSerializer(data = request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data.get('user')
    token, created = Token.objects.get_or_create(user = user)

    return Response({'token': token.key})

@api_view(['POST'])
def UserLogout(request):
    print(type(request.auth))
    request.auth.delete()
    return Response('deleted')
