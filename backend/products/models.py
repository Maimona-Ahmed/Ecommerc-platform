from django.db import models
from django.utils.text import slugify
import uuid

class Category(models.Model):
    name = models.CharField(max_length=100,unique=True)
    slug = models.SlugField(max_length=120,unique=True, blank=True)
    image = models.ImageField(upload_to="categories",blank=True,null=True)
    def save(self,*args,**kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args,**kwargs)

    def __str__(self):
        return self.name
    
class AvailabilityStatuses(models.IntegerChoices):
    IN_STOCK = 1, "In stock"
    AWAITING_ARRIVAL = 2, "Awaiting Arrival"
    LOW_IN_STOCK = 3, "Low In Stock"
    OUT_OF_STOCK = 4, "Owt Of Stock"
    
class Product(models.Model):
    category = models.ForeignKey(Category,on_delete=models.CASCADE,related_name="products")
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=250,unique=True,blank=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=100,decimal_places=2)
    stock = models.PositiveBigIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def save(self,*args,**kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args,**kwargs)
    
    def __str__(self):
        return self.name

class ProductImage(models.Model):
    product = models.ForeignKey(Product,on_delete=models.CASCADE,related_name="images")
    image = models.ImageField(upload_to="products/")
    is_primary = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.name} image"
   
class Variation(models.Model):
    product = models.ForeignKey(Product,on_delete=models.CASCADE,related_name="variations")
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name
    
class VariationOption(models.Model):
    variation = models.ForeignKey(Variation,on_delete=models.CASCADE,related_name="options")
    value = models.CharField(max_length=100)

    def __str__(self):
        return self.value
    
class ProductVariant(models.Model):
    product = models.ForeignKey(Product,on_delete=models.CASCADE,related_name="variants")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveBigIntegerField(default=0)
    sku = models.CharField(max_length=100,unique=True, default=uuid.uuid4, editable=False)
    is_active = models.BooleanField(default=True)
    availability = models.IntegerField(choices=AvailabilityStatuses.choices,default=AvailabilityStatuses.IN_STOCK)
    def __str__(self):
        return f"{self.product.name} - {self.sku}"
    class Meta:
        constraints =[
            models.UniqueConstraint(fields=["product","sku"], name = "unique_product_sku")
        ]
    def save(self,*args,**kwargs):
        if self.stock>0:
            self.availability= AvailabilityStatuses.IN_STOCK
        else:
            self.availability=AvailabilityStatuses.OUT_OF_STOCK
        super().save(*args,**kwargs)

class ProductVariantOption(models.Model):
    variant = models.ForeignKey(ProductVariant,on_delete=models.CASCADE,related_name="variant_options")
    option = models.ForeignKey(VariationOption,on_delete=models.CASCADE,related_name="variant_options")
    def __str__(self):
        return f"{self.variant} - {self.option}"
            
class ProductAttribute(models.Model):
     product = models.ForeignKey(Product,on_delete=models.CASCADE,related_name="attributes")
     name = models.CharField(max_length=100)
     value = models.CharField(max_length=255)
     def __str__(self):
        return f"{self.name} - {self.value}"
