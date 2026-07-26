from django.contrib import admin
from .models import Coupon, CouponUsage

class CouponUsageInline(admin.TabularInline):
    model = CouponUsage
    readonly_fields = ('coupon', 'user', 'order', 'discount_amount')
    extra = 0

@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'discount_type', 'discount_value', 'start_date', 'end_date', 'is_active')
    list_filter = ('discount_type', 'is_active', 'scope')
    search_fields = ('code', 'name')
    inlines = [CouponUsageInline]

@admin.register(CouponUsage)
class CouponUsageAdmin(admin.ModelAdmin):
    list_display = ('coupon', 'user', 'order', 'discount_amount', 'created_at')
    readonly_fields = ('coupon', 'user', 'order', 'discount_amount')
