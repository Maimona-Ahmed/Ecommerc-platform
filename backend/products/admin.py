from django.contrib import admin
from .models import Category,Product,ProductImage,ProductVariantOption,ProductAttribute,ProductVariant,Variation,VariationOption

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(ProductImage)
admin.site.register(VariationOption)
admin.site.register(Variation)
admin.site.register(ProductAttribute)
admin.site.register(ProductVariant)
admin.site.register(ProductVariantOption)


# Register your models here.
