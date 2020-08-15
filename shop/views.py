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
    return render(request, "shop/request.html")

def contact(request):
    return render(request, "shop/contact.html")

def tracker(request):
    return render(request, "shop/tracker.html")

def search(request):
    return render(request, "shop/search.html")

def productView(request):
    return render(request, "shop/prodView.html")

def checkout(request):
    return render(request, "shop/checkout.html")
