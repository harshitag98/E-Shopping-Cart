from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    return render(request, "index.html")

def about(request):
    return HttpResponse("We are at about page")

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