from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from api.views.views import Contacts, contact_update_delete
from api.views.auth import logout, login

urlpatterns = [
    path('contacts/', Contacts.as_view()),
    path('login/', login),
    path('logout/', logout),
    path('contacts/<int:pk>/', contact_update_delete)
]
