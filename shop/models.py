from django.db import models

# Create your models here.
class Product(models.Model):
    product_id = models.AutoField
    product_name = models.CharField(max_length=50)
    category = models.CharField(max_length=50, default="")
    subcategory = models.CharField(max_length=50, default="")
    price = models.CharField(max_length=10, default="0")
    description = models.CharField(max_length=3000, default="")
    overview = models.CharField(max_length=3000, default="")
    publish_date = models.DateField()
    image = models.ImageField(upload_to='shop/images', default="")

    def __str__(self):
        return self.product_name

    def overview_as_list(self):
        return self.overview.split('\\n')


class Contact(models.Model):
    contact_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    phone = models.CharField(max_length=50)
    message = models.CharField(max_length=2000)

    def __str__(self):
        return self.name


class Order(models.Model):
    order_id = models.AutoField(primary_key=True)
    orderID = models.CharField(max_length=5000, default="")
    order_products = models.CharField(max_length=5000, default="")
    amount = models.CharField(max_length=100, default="")
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=20)
    state = models.CharField(max_length=30)
    zip_code = models.CharField(max_length=20)
    phone = models.CharField(max_length=20)

    def __str__(self):
        return self.orderID

    
class OrderTracker(models.Model):
    tracker_id  = models.AutoField(primary_key=True)
    order_id = models.CharField(max_length=20)
    update_description = models.CharField(max_length=500)
    timestamp = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.order_id
        

#username for admin user is harshit and password is django123