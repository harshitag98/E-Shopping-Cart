from django.contrib import admin
from .models import Product, Contact, Order, OrderTracker

# Register your models here.
admin.site.register(Product)
admin.site.register(Contact)
admin.site.register(Order)
admin.site.register(OrderTracker)