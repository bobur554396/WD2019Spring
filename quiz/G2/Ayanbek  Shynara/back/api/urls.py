from django.urls import path
from api.views import ContactList, contact_list_detail, login, logout


urlpatterns = [

    path('contacts/', ContactList.as_view()),
    path('contacts/<int:pk>/', contact_list_detail),
    path('login/', login),
    path('logout/', logout),

]
