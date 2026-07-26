import os
import razorpay
from decimal import Decimal
from django.conf import settings
from common.models import StoreSettings
from orders.models import Order, PaymentStatus, OrderStatus
from orders.services import OrderService
from .models import PaymentTransaction


class RazorpayService:

    @staticmethod
    def get_client():
        store_settings = StoreSettings.load()
        key_id = (
            store_settings.payment_gateway_key or
            getattr(settings, "RAZORPAY_KEY_ID", "") or
            os.getenv("RAZORPAY_KEY_ID", "")
        )
        key_secret = (
            store_settings.payment_gateway_secret or
            getattr(settings, "RAZORPAY_KEY_SECRET", "") or
            os.getenv("RAZORPAY_KEY_SECRET", "")
        )
        if not key_id or not key_secret:
            raise ValueError("Razorpay Key ID or Secret is not configured.")
        return razorpay.Client(auth=(key_id, key_secret)), key_id

    @staticmethod
    def create_razorpay_order(user, order_number):
        order = Order.objects.get(order_number=order_number, user=user)

        client, key_id = RazorpayService.get_client()

        amount_in_paise = int(order.grand_total * 100)

        razorpay_order = client.order.create({
            "amount": amount_in_paise,
            "currency": "INR",
            "receipt": order.order_number,
            "payment_capture": 1,
        })

        PaymentTransaction.objects.create(
            order=order,
            payment_gateway="razorpay",
            razorpay_order_id=razorpay_order["id"],
            amount=order.grand_total,
            currency="INR",
            status=PaymentTransaction.Status.PENDING,
        )

        return {
            "key_id": key_id,
            "razorpay_order_id": razorpay_order["id"],
            "amount": amount_in_paise,
            "currency": "INR",
            "order_number": order.order_number,
            "user_name": f"{user.first_name} {user.last_name}".strip() or user.email,
            "user_email": user.email,
            "user_phone": getattr(user, "phone_number", ""),
        }

    @staticmethod
    def verify_payment(user, razorpay_order_id, razorpay_payment_id, razorpay_signature, order_number):
        order = Order.objects.get(order_number=order_number, user=user)

        client, _ = RazorpayService.get_client()

        # 1. Verify HMAC Payment Signature
        try:
            client.utility.verify_payment_signature({
                "razorpay_order_id": razorpay_order_id,
                "razorpay_payment_id": razorpay_payment_id,
                "razorpay_signature": razorpay_signature,
            })
        except Exception as sig_err:
            tx = PaymentTransaction.objects.filter(
                order=order,
                razorpay_order_id=razorpay_order_id,
            ).first()

            if tx:
                tx.status = PaymentTransaction.Status.FAILED
                tx.error_description = f"Signature verification failed: {str(sig_err)}"
                tx.save()

            order.payment_status = PaymentStatus.FAILED
            order.save(update_fields=["payment_status"])

            return False, "Invalid payment signature.", order

        # 2. Payment signature is VALID -> Mark Payment SUCCESS
        tx = PaymentTransaction.objects.filter(
            order=order,
            razorpay_order_id=razorpay_order_id,
        ).first()

        if tx:
            tx.razorpay_payment_id = razorpay_payment_id
            tx.razorpay_signature = razorpay_signature
            tx.status = PaymentTransaction.Status.SUCCESS
            tx.save()

        order.payment_status = PaymentStatus.PAID
        order.save(update_fields=["payment_status"])

        # 3. Confirm Order and deduct stock
        try:
            if order.status == OrderStatus.PENDING:
                OrderService.confirm_order(order)
        except Exception as confirm_err:
            print("Order confirmation warning:", confirm_err)

        return True, "Payment verified successfully.", order
