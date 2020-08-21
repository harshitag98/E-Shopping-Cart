from django.shortcuts import render
from django.http import HttpResponse
from .models import Product, Contact, Order, OrderTracker
from math import ceil
import uuid, json


# Create your views here.
def index(request):
    categories_products = Product.objects.values('category')
    categories = {item['category'] for item in categories_products}
    categories = sorted(list(categories))
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
    if(request.method == 'POST'):
        name = request.POST.get('name', '')
        email = request.POST.get('email', '')
        phone = request.POST.get('phone', '')
        message = request.POST.get('message', '')
        contact = Contact(name=name, email=email, phone=phone, message=message)
        contact.save()
    return render(request, "shop/contact.html")


def tracker(request):
    if request.method=="POST":
        order_id = request.POST.get('order_id', '')
        email = request.POST.get('email', '')
        try:
            order = Order.objects.filter(orderID=order_id, email=email)
            if len(order)>0:
                track = OrderTracker.objects.filter(order_id=order_id)
                updates = []
                for item in track:
                    updates.append({'description':item.update_description, 'time':item.timestamp})
                response = json.dumps(updates, default=str)
                return HttpResponse(response)
            else:
                return HttpResponse('{}')
        except Exception as e:
            return HttpResponse('{}')

    return render(request, "shop/tracker.html")


def search(request):
    return render(request, "shop/search.html")


def productView(request, myid):
    product = Product.objects.filter(id=myid)
    return render(request, "shop/prodView.html", {'product':product[0]})


def checkout(request):
    if request.method=="POST":
        order_products = request.POST.get('itemsJson', '')
        name = request.POST.get('name', '')
        email = request.POST.get('email', '')
        address = request.POST.get('address1', '') + " " + request.POST.get('address2', '')
        city = request.POST.get('city', '')
        state = request.POST.get('state', '')
        zip_code = request.POST.get('zip_code', '')
        phone = request.POST.get('phone', '')

        random = str(uuid.uuid4()).upper()
        random = random.replace("-","")
        orderID = random[0:15]

        order = Order(orderID=orderID, order_products=order_products, name=name, email=email, address=address, city=city, state=state, zip_code=zip_code, phone=phone)
        order.save()

        track = OrderTracker(order_id=order.orderID, update_description="The order has been placed")
        track.save()

        products = json.loads(order_products)
        params = {'products':len(products), 'name':name, 'address':address, 'city':city, 'state':state, 'zip':zip_code, 'order_id':orderID}
        return render(request, 'shop/orderConfirm.html', params)
    return render(request, 'shop/checkout.html')
