from rest_framework import serializers


class CreateRazorpayOrderSerializer(serializers.Serializer):
    order_number = serializers.CharField(max_length=30)


class VerifyRazorpayPaymentSerializer(serializers.Serializer):
    order_number = serializers.CharField(max_length=30)
    razorpay_order_id = serializers.CharField(max_length=100)
    razorpay_payment_id = serializers.CharField(max_length=100)
    razorpay_signature = serializers.CharField(max_length=255)
