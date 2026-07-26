from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema
from accounts.models import Address
from common.responses import success_response, error_response
from orders.models import Order
from orders.serializers import CheckoutSerializer, OrderSerializer, AdminOrderDetailSerializer, AdminOrderListSerializer, AdminOrderUpdateSerializer
from orders.services import OrderService, AdminOrderService


class CheckoutAPIView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CheckoutSerializer

    @extend_schema(
        operation_id="checkout_order",
        tags=["Orders"],
        request=CheckoutSerializer,
        responses={201: OrderSerializer},
    )
    def post(self, request):
        serializer = CheckoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            address = Address.objects.get(
                pk=serializer.validated_data["address_id"],
                user=request.user,
            )

            print("Authenticated User ID:", request.user.id)
            print("Authenticated Email:", request.user.email)
            order = OrderService.create_order(
                user=request.user,
                address=address,
                payment_method=serializer.validated_data["payment_method"],
                notes=serializer.validated_data.get("notes", ""),
                coupon_code=serializer.validated_data.get("coupon_code"),
            )

            return success_response(
                data=OrderSerializer(
                    order,
                    context={"request": request},
                ).data,
                message="Order created successfully.",
            )

        except Address.DoesNotExist:
            return error_response(
                message="Address not found.",
                status_code=status.HTTP_404_NOT_FOUND,
            )

        except ValueError as ex:
            return error_response(
                message=str(ex),
                status_code=status.HTTP_400_BAD_REQUEST,
            )

@extend_schema(
    tags=["Orders"],
    summary="List Orders",
    responses=OrderSerializer(many=True),
)
class OrderListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = (
            Order.objects
            .filter(user=request.user)
            .prefetch_related("items")
            .order_by("-created_at")
        )

        serializer = OrderSerializer(
            orders,
            many=True,
            context={"request": request},
        )

        return success_response(
            data=serializer.data,
            message="Orders fetched successfully.",
        )

@extend_schema(
    tags=["Orders"],
    summary="Order Details",
    responses=OrderSerializer,
)
class OrderDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, order_number):
        try:
            order = (
                Order.objects
                .prefetch_related("items")
                .get(
                    order_number=order_number,
                    user=request.user,
                )
            )

            serializer = OrderSerializer(
                order,
                context={"request": request},
            )

            return success_response(
                data=serializer.data,
                message="Order fetched successfully.",
            )

        except Order.DoesNotExist:
            return error_response(
                message="Order not found.",
                status_code=status.HTTP_404_NOT_FOUND,
            )

class AdminOrderListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = AdminOrderService.get_orders(request.query_params)

        serializer = AdminOrderListSerializer(
            orders,
            many=True,
        )

        return success_response(
            message="Orders fetched successfully.",
            data=serializer.data,
        )


class AdminOrderDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id):
        order = AdminOrderService.get_order(order_id)

        serializer = AdminOrderDetailSerializer(order)

        return success_response(
            message="Order fetched successfully.",
            data=serializer.data,
        )

    def put(self, request, order_id):
        order = AdminOrderService.get_order(order_id)

        serializer = AdminOrderUpdateSerializer(
            order,
            data=request.data,
            partial=True,
        )

        if not serializer.is_valid():
            return error_response(
                message="Validation failed.",
                errors=serializer.errors,
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        order = AdminOrderService.update_order(
            order,
            serializer.validated_data,
        )

        return success_response(
            message="Order updated successfully.",
            data=AdminOrderDetailSerializer(order).data,
        )


class AdminOrderShippingQuotesAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, order_id):
        from integrations.envia.service import EnviaService

        try:
            order = Order.objects.get(pk=order_id)
        except Order.DoesNotExist:
            return error_response(
                message="Order not found.",
                status_code=status.HTTP_404_NOT_FOUND,
            )

        weight_kg = request.data.get("weight_kg")
        length_cm = request.data.get("length_cm")
        width_cm = request.data.get("width_cm")
        height_cm = request.data.get("height_cm")

        quotes = EnviaService.get_available_couriers_with_rates(
            order,
            custom_weight=weight_kg,
            custom_length=length_cm,
            custom_width=width_cm,
            custom_height=height_cm,
        )
        return success_response(
            message="Shipping quotes fetched successfully.",
            data=quotes,
        )

    def get(self, request, order_id):
        from integrations.envia.service import EnviaService

        try:
            order = Order.objects.get(pk=order_id)
        except Order.DoesNotExist:
            return error_response(
                message="Order not found.",
                status_code=status.HTTP_404_NOT_FOUND,
            )

        quotes = EnviaService.get_available_couriers_with_rates(order)
        return success_response(
            message="Shipping quotes fetched successfully.",
            data=quotes,
        )


class AdminOrderShippingLabelAPIView(APIView):
    permission_classes = []

    def get(self, request, order_id):
        from django.http import HttpResponse
        from integrations.envia.service import EnviaService

        try:
            order = Order.objects.get(pk=order_id)
        except Order.DoesNotExist:
            return HttpResponse("Order not found", status=404)

        origin = EnviaService.get_origin_data()
        dest = EnviaService.get_destination_data(order)
        courier = order.courier_name or "Delhivery Surface (Road)"
        tracking = order.tracking_number or f"ENVIND{order.id.hex[:8].upper()}"

        items_html = "".join([
            f"<tr><td>{item.product_name} ({item.size}/{item.color})</td><td style='text-align:right;'>x{item.quantity}</td></tr>"
            for item in order.items.all()
        ])

        html_content = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Shipping Label - {order.order_number}</title>
    <style>
        @page {{ size: 4in 6in; margin: 0; }}
        body {{
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            width: 3.8in;
            height: 5.8in;
            margin: 0 auto;
            padding: 10px;
            box-sizing: border-box;
            background: #fff;
            color: #000;
        }}
        .label-container {{
            border: 3px solid #000;
            height: 98%;
            padding: 10px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }}
        .header {{
            border-bottom: 2px solid #000;
            padding-bottom: 6px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }}
        .brand {{ font-size: 16px; font-weight: 900; letter-spacing: 1px; }}
        .road-badge {{ background: #000; color: #fff; padding: 3px 8px; font-size: 11px; font-weight: bold; border-radius: 4px; }}
        .addresses {{ border-bottom: 2px solid #000; padding: 8px 0; display: flex; flex-direction: column; gap: 8px; font-size: 11px; }}
        .from-box {{ border-bottom: 1px dashed #ccc; padding-bottom: 6px; }}
        .to-box {{ font-size: 12px; }}
        .to-box strong {{ font-size: 14px; display: block; margin-bottom: 2px; }}
        .barcode-section {{ text-align: center; border-bottom: 2px solid #000; padding: 10px 0; }}
        .barcode-lines {{
            height: 45px;
            background: repeating-linear-gradient(90deg, #000, #000 2px, #fff 2px, #fff 4px, #000 4px, #000 7px, #fff 7px, #fff 9px);
            margin: 0 auto 6px;
            width: 85%;
        }}
        .tracking-code {{ font-family: monospace; font-size: 14px; font-weight: bold; letter-spacing: 2px; }}
        .meta-grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 10px; border-bottom: 2px solid #000; padding: 6px 0; }}
        .items-table {{ width: 100%; font-size: 10px; border-collapse: collapse; margin-top: 4px; }}
        .items-table td {{ padding: 2px 0; border-bottom: 1px solid #eee; }}
        .print-btn {{
            position: fixed; top: 10px; right: 10px; background: #2563eb; color: #fff; border: none; padding: 8px 16px; font-weight: bold; border-radius: 6px; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }}
        @media print {{
            .print-btn {{ display: none; }}
        }}
    </style>
</head>
<body>
    <button class="print-btn" onclick="window.print()">Print Shipping Label</button>
    <div class="label-container">
        <div>
            <div class="header">
                <span class="brand">3SEVEN STUDIO</span>
                <span class="road-badge">{courier.upper()}</span>
            </div>
            <div class="addresses">
                <div class="from-box">
                    <strong>FROM (SHIPPER):</strong><br>
                    {origin['company']} - {origin['name']}<br>
                    {origin['address1']}, {origin['address2']}<br>
                    {origin['city']}, {origin['state']} - {origin['postalCode']}<br>
                    Ph: {origin['phone']}
                </div>
                <div class="to-box">
                    <strong>SHIP TO (RECIPIENT):</strong><br>
                    <strong>{dest['name']}</strong>
                    {dest['address1']} {dest['address2']}<br>
                    {dest['city']}, {dest['state']} - <strong>{dest['postalCode']}</strong><br>
                    Ph: {dest['phone']}
                </div>
            </div>
        </div>

        <div class="barcode-section">
            <div class="barcode-lines"></div>
            <div class="tracking-code">AWB #{tracking}</div>
        </div>

        <div>
            <div class="meta-grid">
                <div><strong>ORDER #:</strong> {order.order_number}</div>
                <div><strong>DATE:</strong> {order.created_at.strftime('%d/%m/%Y')}</div>
                <div><strong>WEIGHT:</strong> 0.50 KG</div>
                <div><strong>PAYMENT:</strong> {order.payment_method.upper()} ({order.payment_status.upper()})</div>
            </div>
            <table class="items-table">
                <tbody>
                    {items_html}
                </tbody>
            </table>
        </div>
    </div>
    <script>
        window.onload = function() {{
            setTimeout(function() {{ window.print(); }}, 500);
        }};
    </script>
</body>
</html>"""
        return HttpResponse(html_content, content_type="text/html")


class AdminAcceptAndShipOrderAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, order_id):
        from integrations.envia.service import EnviaService

        try:
            order = Order.objects.get(pk=order_id)
        except Order.DoesNotExist:
            return error_response(
                message="Order not found.",
                status_code=status.HTTP_404_NOT_FOUND,
            )

        selected_carrier = request.data.get("carrier")
        selected_service = request.data.get("service")
        courier_name = request.data.get("courier_name")
        weight_kg = request.data.get("weight_kg")
        length_cm = request.data.get("length_cm")
        width_cm = request.data.get("width_cm")
        height_cm = request.data.get("height_cm")

        try:
            # Generate Envia road shipment & label with selected courier and weight
            shipment_data = EnviaService.generate_shipment_and_label(
                order,
                selected_carrier=selected_carrier,
                selected_service=selected_service,
                courier_name=courier_name,
                custom_weight=weight_kg,
                custom_length=length_cm,
                custom_width=width_cm,
                custom_height=height_cm,
            )

            # Update Order fields
            order.courier_name = shipment_data["courier_name"]
            order.courier_service_code = shipment_data["courier_service_code"]
            order.shipment_id = shipment_data["shipment_id"]
            order.tracking_number = shipment_data["tracking_number"]
            order.tracking_url = shipment_data["tracking_url"]
            order.shipping_label = shipment_data["shipping_label"]
            order.status = "shipped"
            order.save(update_fields=[
                "courier_name",
                "courier_service_code",
                "shipment_id",
                "tracking_number",
                "tracking_url",
                "shipping_label",
                "status",
            ])

            # Record OrderStatusHistory
            from orders.models import OrderStatusHistory
            OrderStatusHistory.objects.create(
                order=order,
                status="shipped",
                comment=f"Order accepted by Admin. Shipped via road courier: {shipment_data['courier_name']} (Tracking #: {shipment_data['tracking_number']})",
            )

            return success_response(
                message=f"Order accepted & shipped via {shipment_data['courier_name']}.",
                data=AdminOrderDetailSerializer(order).data,
            )
        except Exception as e:
            return error_response(
                message=f"Failed to accept and generate shipping label: {str(e)}",
                status_code=status.HTTP_400_BAD_REQUEST,
            )