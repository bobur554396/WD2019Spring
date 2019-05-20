from django.urls import path
from api import views

urlpatterns = [
	path('', views.contact_lists),
	path('<int:pk>/', views.contact_list_detail),
]