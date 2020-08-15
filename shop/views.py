from django.shortcuts import render
from django.http import HttpResponse
from .models import Product
from math import ceil


# Create your views here.
def index(request):
    categories_products = Product.objects.values('category')
    categories = {item['category'] for item in categories_products}
    all_products = []
    for cat in categories:
        product = Product.objects.filter(category=cat)
        n = len(product)
        nSlides = n//4 + ceil((n/4) - (n//4))
        all_products.append([product, range(1,nSlides+1), nSlides])
    params = {'all_products': all_products}
    return render(request, "shop/index.html", params)

def about(request):
    return render(request, "shop/about.html")

def contact(request):
    return HttpResponse("We are at contact page")

def tracker(request):
    return HttpResponse("We are at tracker page")

def search(request):
    return HttpResponse("We are at search page")

def productView(request):
    return HttpResponse("We are at productView page")

def checkout(request):
    return HttpResponse("We are at checkout page")