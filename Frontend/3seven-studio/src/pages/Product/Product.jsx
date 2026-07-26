import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";

import ProductGallery from "../../components/product/ProductGallery/ProductGallery";
import ProductDetails from "../../components/product/ProductDetails/ProductDetails";
import ProductTabs from "../../components/product/ProductTabs/ProductTabs";
import RelatedProducts from "../../components/product/RelatedProducts/RelatedProducts";
import { ProductReviews } from "../../components/reviews";

import { getProduct } from "../../services/productService";
import { useCart } from "../../context/CartContext";

import "./Product.css";

function Product() {

    const { slug } = useParams();
    const navigate = useNavigate();

    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {

        fetchProduct();

    }, [slug]);

    const fetchProduct = async () => {

        try {

            setLoading(true);

            const productData = await getProduct(slug);
            setProduct(productData);

            if (productData.variants?.length) {

                setSelectedVariant(productData.variants[0]);
                setSelectedSize(productData.variants[0].size);

            }

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleAddToCart = async () => {

        if (!selectedVariant) {

            toast.error("Please select a size.");

            return;

        }

        try {

            await addToCart(
                selectedVariant.id,
                quantity,
                {
                    id: product.id,
                    product_name: product.name,
                    product_slug: product.slug,
                    thumbnail: product.thumbnail,
                    price: Number(selectedVariant.price),
                    size: selectedVariant.size,
                    color: selectedVariant.color,
                }
            );

            toast.success("Product added to cart.");

        } catch (error) {

            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Unable to add product to cart."
            );

        }

    };

    const handleBuyNow = async () => {

        if (!selectedVariant) {

            toast.error("Please select a size.");

            return;

        }

        try {

            await addToCart(
                selectedVariant.id,
                quantity,
                {
                    id: product.id,
                    product_name: product.name,
                    product_slug: product.slug,
                    thumbnail: product.thumbnail,
                    price: Number(selectedVariant.price),
                    size: selectedVariant.size,
                    color: selectedVariant.color,
                }
            );

            navigate("/checkout");

        } catch (error) {

            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Unable to proceed to checkout."
            );

        }

    };

    if (loading) {

        return <h2 style={{ padding: "80px" }}>Loading...</h2>;

    }

    if (!product) {

        return <h2 style={{ padding: "80px" }}>Product not found.</h2>;

    }

    return (

        <>

            <Navbar />

            <Breadcrumb
                items={[
                    {
                        label: "Home",
                        link: "/",
                    },
                    {
                        label: "Shop",
                        link: "/shop",
                    },
                    {
                        label: product.name,
                    },
                ]}
            />

            <section className="product-page">

                <div className="product-container">

                    <ProductGallery
                        product={product}
                    />

                    <ProductDetails
                        product={product}
                        selectedVariant={selectedVariant}
                        setSelectedVariant={setSelectedVariant}
                        selectedSize={selectedSize}
                        setSelectedSize={setSelectedSize}
                        quantity={quantity}
                        setQuantity={setQuantity}
                        onAddToCart={handleAddToCart}
                        onBuyNow={handleBuyNow}
                    />

                </div>

            </section>

            <ProductTabs
                product={product}
            />

            <ProductReviews productSlug={product.slug} />

            <RelatedProducts
                category={product.category}
                productId={product.id}
            />

            <Footer />

        </>

    );

}

export default Product;