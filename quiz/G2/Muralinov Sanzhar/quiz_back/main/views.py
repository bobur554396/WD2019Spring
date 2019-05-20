from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.http import HttpResponse
from datetime import datetime
from api.models import Contact


def contacts(request):
    contacts = Contact.objects.all()
    context = {
        'contacts': contacts
    }

    return render(request, 'contacts.html', context)

