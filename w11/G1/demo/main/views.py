from django.shortcuts import render
from django.http import HttpResponse
from datetime import datetime
from shop.models import Category


def category_list(request):
    categories = Category.objects.all()
    context = {
        'categories': categories
    }
    return render(request, 'category_list.html', context)


def index(request):
    context = {
        'name': 'Student 1',
        'current_time': datetime.now(),
        'is_logged_in': False,
        'nums': [a for a in range(10)],
        'product': {
            'id': 1,
            'name': 'Product 1'
        },
        'products': [{
            'id': i,
            'name': 'Product {}'.format(i)
        } for i in range(10)]
    }
    return render(request, 'index.html', context)


def home(request):
    return render(request, 'home.html')


def about(request):
    return render(request, 'about.html')


def current_time(request):
    return HttpResponse('<h1>{}</h1>'.format(datetime.now()))


def show_product(request, pk):
    return HttpResponse('<h1>Product with id: {}</h1>'.format(pk))


def show_product_reg(request, id):
    return HttpResponse('<h1>Product with reg: {}</h1>'.format(id))


def product_list(request):
    return HttpResponse('asd')
