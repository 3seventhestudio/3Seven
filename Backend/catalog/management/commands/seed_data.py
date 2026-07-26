import os
from django.core.management.base import BaseCommand
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.files import File
from django.conf import settings
from django.utils.text import slugify
from catalog.models import Category, Product, ProductImage, Size, Color, ProductVariant
from common.models import StoreSettings


class Command(BaseCommand):
    help = "Seed database with premium clothes catalog, sizes, colors, variants, images, and settings"

    def handle(self, *args, **options):
        self.stdout.write("Starting database seeding...")

        # 1. Initialize StoreSettings
        settings_obj = StoreSettings.load()
        settings_obj.store_name = "3Seven Studio"
        settings_obj.free_shipping = True
        settings_obj.shipping_charge = 99.00
        settings_obj.cod_enabled = True
        settings_obj.cod_charge = 50.00
        settings_obj.gst_enabled = True
        settings_obj.gst_percentage = 12.00
        settings_obj.save()
        self.stdout.write("StoreSettings initialized.")

        # 2. Create Sizes (Numeric for Jeans/Pants, Alpha for Shirts/T-Shirts/Jackets/Dresses)
        sizes_data = [
            ("26", 1),
            ("28", 2),
            ("30", 3),
            ("32", 4),
            ("34", 5),
            ("XS", 6),
            ("S", 7),
            ("M", 8),
            ("L", 9),
            ("XL", 10),
            ("XXL", 11),
        ]
        sizes = {}
        for name, order in sizes_data:
            size, _ = Size.objects.get_or_create(
                name=name,
                defaults={"display_order": order}
            )
            sizes[name] = size
        self.stdout.write(f"Seeded {len(sizes)} sizes.")

        # 3. Create Colors
        colors_data = [
            ("Indigo Blue", "#2A4D69"),
            ("Jet Black", "#1A1A1A"),
            ("Acid Wash", "#7B9095"),
            ("Off-White", "#F4F3EF"),
            ("Olive Green", "#3F4E3D"),
        ]
        colors = {}
        for name, hex_code in colors_data:
            color, _ = Color.objects.get_or_create(
                name=name,
                defaults={"hex_code": hex_code}
            )
            colors[name] = color
        self.stdout.write(f"Seeded {len(colors)} colors.")

        # 4. Create Categories
        categories_data = [
            ("Jeans", "jeans", "Premium denim jeans designed for maximum comfort and style.", 1),
            ("Jackets", "jackets", "Timeless outerwear pieces built to endure all seasons.", 2),
            ("Shirts", "shirts", "Lightweight, breathable linen and cotton button-downs.", 3),
            ("Dresses", "dresses", "Elegant silk and wrap dresses for warm summer days.", 4),
        ]
        categories = {}
        for name, slug, desc, order in categories_data:
            category, _ = Category.objects.get_or_create(
                slug=slug,
                defaults={
                    "name": name,
                    "description": desc,
                    "display_order": order,
                }
            )
            categories[slug] = category
        self.stdout.write(f"Seeded {len(categories)} categories.")

        # A tiny 1x1 black JPEG file as a fallback
        dummy_jpeg = (
            b'\xff\xd8\xff\xe0\x00\x10JFIF\x00\x01\x01\x01\x00`\x00`\x00\x00'
            b'\xff\xdb\x00C\x00\x08\x06\x06\x07\x06\x05\x08\x07\x07\x07\t\t\x08'
            b'\n\x0c\x14\r\x0c\x0b\x0b\x0c\x19\x12\x13\x0f\x14\x1d\x1a\x1f\x1e'
            b'\x1d\x1a\x1c\x1c $.\' ",#\x1c\x1c(7),01444\x1f\'9=82<.342'
            b'\xff\xc0\x00\x0b\x08\x00\x01\x00\x01\x01\x01\x11\x00\xff\xc4\x00'
            b'\x1f\x00\x00\x01\x05\x01\x01\x01\x01\x01\x01\x00\x00\x00\x00\x00'
            b'\x00\x00\x00\x01\x02\x03\x04\x05\x06\x07\x08\t\n\x0b\xff\xc4\x00'
            b'\xb5\x10\x00\x02\x01\x03\x03\x02\x04\x03\x05\x05\x04\x04\x00\x00'
            b'\x01}\x01\x02\x03\x00\x04\x11\x05\x12!1A\x06\x13Qa\x07"q\x142\x81'
            b'\x91\xa1\x08#B\xb1\xc1\x15R\xd1\xf0$3br\x82\x92\xa2\x16C\xe1\xf1'
            b'%4DS\x93\xb2\xc2\xd2\x09\n\x17\x18\x19\x1a\x25\x26\x27\x28\x29\x2a'
            b'56789:CDEFGHIJSTUVWXYZcdefghijstuvwxyz\x83\x84\x85\x86\x87\x88\x89'
            b'\x8a\x94\x95\x96\x97\x98\x99\x9a\xa3\xa4\xa5\xa6\xa7\xa8\xa9\xaa'
            b'\xb3\xb4\xb5\xb6\xb7\xb8\xb9\xba\xc3\xc4\xc5\xc6\xc7\xc8\xc9\xca'
            b'\xd3\xd4\xd5\xd6\xd7\xd8\xd9\xda\xe2\xe3\xe4\xe5\xe6\xe7\xe8\xe9'
            b'\xea\xf2\xf3\xf4\xf5\xf6\xf7\xf8\xf9\xfa\xff\xda\x00\x0c\x03\x01'
            b'\x00\x02\x11\x03\x11\x00?\x00\xed\xfc\xff\xd9'
        )

        # 5. Seed Products with real image mappings & category-appropriate sizes
        products_data = [
            {
                "category": categories["jeans"],
                "name": "Wideleg Flared Denim Jeans",
                "short_description": "Retro-inspired wide leg flared jeans made from organic cotton denim.",
                "description": "Inspired by 70s fashion, our Wideleg Flared Denim Jeans feature a high-rise fit, fitted hips, and a beautiful flared leg. Crafted with premium mid-weight denim that has just enough stretch to sculpt and move with you throughout the day.",
                "price": 2499.00,
                "compare_price": 3499.00,
                "featured": True,
                "new_arrival": False,
                "best_seller": True,
                "sizes": ["26", "28", "30", "32", "34"],
                "colors": ["Indigo Blue", "Acid Wash"],
                "image_name": "product-1.jpg"
            },
            {
                "category": categories["jeans"],
                "name": "Classic Slim Fit Selvedge Jeans",
                "short_description": "Clean-cut slim jeans woven on traditional shuttle looms.",
                "description": "Made from raw Japanese selvedge denim, these jeans are stiff at first but break in to form a unique fit mapped entirely to your body. Features signature red-line selvedge cuffs, button fly, and a mid-rise slim fit.",
                "price": 2999.00,
                "compare_price": 3999.00,
                "featured": False,
                "new_arrival": True,
                "best_seller": True,
                "sizes": ["26", "28", "30", "32", "34"],
                "colors": ["Indigo Blue", "Jet Black"],
                "image_name": "product-2.jpg"
            },
            {
                "category": categories["jackets"],
                "name": "Oversized Denim Trucker Jacket",
                "short_description": "A relaxed, vintage-inspired denim jacket for effortless layering.",
                "description": "An essential addition to your capsule wardrobe, the Oversized Trucker Jacket features dropped shoulders, a chest button-pocket design, and a relaxed, slouchy silhouette. Perfect for layering over sweaters or light t-shirts.",
                "price": 3499.00,
                "compare_price": 4999.00,
                "featured": True,
                "new_arrival": True,
                "best_seller": False,
                "sizes": ["S", "M", "L", "XL"],
                "colors": ["Acid Wash", "Off-White", "Olive Green"],
                "image_name": "product-3.jpg"
            },
            {
                "category": categories["shirts"],
                "name": "Linen Button-Down Boyfriend Shirt",
                "short_description": "Breathable, lightweight 100% linen shirt in a relaxed cut.",
                "description": "Crafted from pure flax linen, this shirt features a comfortable relaxed drape, chest patch pocket, and classic collar. Stays cool even in warm temperatures and gets softer with every wash.",
                "price": 1899.00,
                "compare_price": 2499.00,
                "featured": False,
                "new_arrival": True,
                "best_seller": False,
                "sizes": ["S", "M", "L", "XL"],
                "colors": ["Off-White", "Olive Green"],
                "image_name": "product-4.jpg"
            },
            {
                "category": categories["dresses"],
                "name": "Silk Wrap Summer Midi Dress",
                "short_description": "Elegant, flowy silk dress with an adjustable wrap closure.",
                "description": "Perfect for weddings, garden parties, or date nights, this wrap dress is made from soft washed silk georgette. Has a waist-accentuating silhouette, flutter sleeves, and a tiered asymmetrical hemline.",
                "price": 4299.00,
                "compare_price": 5999.00,
                "featured": True,
                "new_arrival": False,
                "best_seller": False,
                "sizes": ["XS", "S", "M", "L", "XL"],
                "colors": ["Jet Black", "Off-White"],
                "image_name": "product-5.jpg"
            },
        ]

        frontend_products_dir = os.path.join(
            settings.BASE_DIR.parent, "Frontend", "3seven-studio", "src", "assets", "images", "products"
        )

        for p_info in products_data:
            slug = slugify(p_info["name"])
            sku_prefix = slug[:3].upper() + "-"

            # Create or Update Product
            product, created = Product.objects.update_or_create(
                slug=slug,
                defaults={
                    "category": p_info["category"],
                    "name": p_info["name"],
                    "sku": sku_prefix + "MASTER",
                    "short_description": p_info["short_description"],
                    "description": p_info["description"],
                    "price": p_info["price"],
                    "compare_price": p_info["compare_price"],
                    "featured": p_info["featured"],
                    "new_arrival": p_info["new_arrival"],
                    "best_seller": p_info["best_seller"],
                }
            )

            # Assign real image if it exists in the Frontend directory
            image_path = os.path.join(frontend_products_dir, p_info["image_name"])
            if os.path.exists(image_path):
                self.stdout.write(f"Assigning real image: {p_info['image_name']} to {product.name}")
                with open(image_path, "rb") as f:
                    product.thumbnail.save(f"{slug}_thumb.jpg", File(f), save=True)
                
                # Clear previous gallery images to avoid stacking
                product.images.all().delete()
                
                with open(image_path, "rb") as f:
                    ProductImage.objects.create(
                        product=product,
                        image=File(f, name=f"{slug}_primary.jpg"),
                        is_primary=True,
                        display_order=1
                    )
            else:
                self.stdout.write(f"Real image not found at {image_path}. Using fallback.")
                if created or not product.thumbnail:
                    thumbnail_file = SimpleUploadedFile(
                        name=f"{slug}_thumb.jpg",
                        content=dummy_jpeg,
                        content_type="image/jpeg"
                    )
                    product.thumbnail = thumbnail_file
                    product.save()

                if not product.images.filter(is_primary=True).exists():
                    image_file = SimpleUploadedFile(
                        name=f"{slug}_primary.jpg",
                        content=dummy_jpeg,
                        content_type="image/jpeg"
                    )
                    ProductImage.objects.create(
                        product=product,
                        image=image_file,
                        is_primary=True,
                        display_order=1
                    )

            # Clean up old invalid size variants for this product
            product.variants.exclude(size__name__in=p_info["sizes"]).delete()

            # Create/Update Variants for Sizes x Colors combinations
            for color_name in p_info["colors"]:
                for size_name in p_info["sizes"]:
                    size_obj = sizes[size_name]
                    color_obj = colors[color_name]
                    sku = f"{sku_prefix}{size_name}-{color_name[:3].upper()}"

                    ProductVariant.objects.update_or_create(
                        product=product,
                        size=size_obj,
                        color=color_obj,
                        defaults={
                            "sku": sku,
                            "price": product.price,
                            "stock_quantity": 15,
                        }
                    )

            self.stdout.write(f"Seeded/Updated product: {product.name}")

        self.stdout.write("Database seeding completed successfully!")
