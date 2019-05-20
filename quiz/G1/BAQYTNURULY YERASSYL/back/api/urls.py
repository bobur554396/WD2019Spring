from django.urls import include, path
from api import views
from api.authentication import login, logout

urlpatterns = [
    path('contacts/', views.Contacts.as_view()),
    path('login/', login),
    path('logout/', logout),
    path('contacts/<int:pk>/', views.ContactDetail.as_view())
]
