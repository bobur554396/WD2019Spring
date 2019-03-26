from django.http import HttpResponse
from main.models import Product

def hello(request):
    return HttpResponse('<h1>hello</h1>')


def home(request):
    return HttpResponse('<h1>home page</h1>')


def about(request):
    return HttpResponse('<h1>about page</h1>')


def products_list(request):
    products = Product.objects.all()
    print(products)
    return HttpResponse('<h1>products page</h1>')
