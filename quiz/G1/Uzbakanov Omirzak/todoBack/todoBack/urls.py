"""todoBack URL Configuration

The `urlpatterns` list routes URLs to vviews. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function vviews
    1. Add an import:  from my_app import vviews
    2. Add a URL to urlpatterns:  path('', vviews.home, name='home')
Class-based vviews
    1. Add an import:  from other_app.vviews import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls'))
]
