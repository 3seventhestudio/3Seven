from django.contrib import admin
from .models import Review, ReviewImage

class ReviewImageInline(admin.TabularInline):
    model = ReviewImage
    extra = 0

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('product', 'customer', 'rating', 'status', 'verified_purchase', 'is_featured', 'created_at')
    list_filter = ('status', 'rating', 'verified_purchase', 'is_featured')
    search_fields = ('title', 'comment', 'customer__email', 'product__name')
    inlines = [ReviewImageInline]
    readonly_fields = ('helpful_count', 'report_count')

@admin.register(ReviewImage)
class ReviewImageAdmin(admin.ModelAdmin):
    list_display = ('review', 'image', 'display_order')
