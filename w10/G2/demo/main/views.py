from django.http import HttpResponse
from main.models import Product


def hello(request):
    return HttpResponse('<h1>hello</h1>')


def home(request):
    return HttpResponse('<h1>home</h1>')


def about(request):
    return HttpResponse('<h1>about</h1>')


def products_list(request):
    # select * from products;
    products = Product.objects.all()
    print(products)
    return HttpResponse('<h1>products_list</h1>')
