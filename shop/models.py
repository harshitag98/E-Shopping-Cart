from django.db import models

# Create your models here.
class Product(models.Model):
    product_id = models.AutoField
    product_name = models.CharField(max_length=50)
    category = models.CharField(max_length=50, default="")
    subcategory = models.CharField(max_length=50, default="")
    price = models.CharField(max_length=10, default="0")
    description = models.CharField(max_length=2000, default="")
    overview = models.CharField(max_length=2000, default="")
    publish_date = models.DateField()
    image = models.ImageField(upload_to='shop/images', default="")

    def __str__(self):
        return self.product_name

    def overview_as_list(self):
        return self.overview.split('\\n')

