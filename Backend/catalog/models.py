from django.db import models
from django.utils.text import slugify

from common.models import BaseModel


class Category(BaseModel):
    """
    Product categories such as Jeans, Kurtis, Tops, etc.
    """
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True,blank=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="categories/",blank=True,null=True)
    display_order = models.PositiveIntegerField(default=0)
    class Meta:
        db_table = "categories"
        verbose_name = "Category"
        verbose_name_plural = "Categories"
        ordering = ["display_order", "name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Product(BaseModel):
    """
    Product master.
    """

    category = models.ForeignKey(Category, on_delete=models.PROTECT,related_name="products")
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True,blank=True)
    sku = models.CharField(max_length=50,unique=True)
    short_description = models.CharField(max_length=255,blank=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10,decimal_places=2)
    compare_price = models.DecimalField(max_digits=10,decimal_places=2,blank=True,null=True)
    featured = models.BooleanField(default=False)
    new_arrival = models.BooleanField(default=False)
    best_seller = models.BooleanField(default=False)
    stock_quantity = models.PositiveIntegerField(default=0)
    thumbnail = models.ImageField(upload_to="products/",blank=True,null=True)

    class Meta:
        db_table = "products"
        ordering = ["name"]

    def save(self, *args, **kwargs):

        if not self.slug:
            self.slug = slugify(self.name)

        super().save(*args, **kwargs)

    @property
    def in_stock(self):
        return self.stock_quantity > 0

    def __str__(self):
        return self.name

class ProductImage(BaseModel):
    """
    Stores multiple images for a product.
    """

    product = models.ForeignKey(Product,on_delete=models.CASCADE,related_name="images")
    image = models.ImageField(upload_to="products/gallery/")
    alt_text = models.CharField(max_length=255,blank=True)
    display_order = models.PositiveIntegerField(default=1)
    is_primary = models.BooleanField(default=False)
    class Meta:
        db_table = "product_images"
        ordering = ["display_order"]

    def __str__(self):
        return f"{self.product.name} Image {self.display_order}"
    
class Size(BaseModel):
    """
    Product size master.
    """

    name = models.CharField(max_length=20,unique=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = "sizes"
        ordering = ["display_order"]

    def __str__(self):
        return self.name


class Color(BaseModel):
    """
    Product color master.
    """

    name = models.CharField(max_length=50,unique=True)
    hex_code = models.CharField(max_length=7,blank=True,help_text="Example: #000000")

    class Meta:
        db_table = "colors"
        ordering = ["name"]

    def __str__(self):
        return self.name


class ProductVariant(BaseModel):
    """
    Inventory for a specific Size + Color combination.
    """

    product = models.ForeignKey(Product,on_delete=models.CASCADE,related_name="variants")
    size = models.ForeignKey(Size,on_delete=models.PROTECT)
    color = models.ForeignKey(Color,on_delete=models.PROTECT)
    sku = models.CharField(max_length=100,unique=True)
    price = models.DecimalField(max_digits=10,decimal_places=2)
    stock_quantity = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = "product_variants"
        ordering = ["product", "size"]
        unique_together = ("product", "size", "color")

    @property
    def in_stock(self):
        return self.stock_quantity > 0

    def __str__(self):
        return f"{self.product.name} - {self.size.name} - {self.color.name}"