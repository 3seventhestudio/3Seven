import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";

import ProductGallery from "../../components/product/ProductGallery/ProductGallery";
import ProductDetails from "../../components/product/ProductDetails/ProductDetails";
import ProductTabs from "../../components/product/ProductTabs/ProductTabs";
import RelatedProducts from "../../components/product/RelatedProducts/RelatedProducts";

import { getProduct } from "../../services/productService";

import "./Product.css";

function Product() {

    const { slug } = useParams();

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchProduct();

    }, [slug]);

    const fetchProduct = async () => {

        try {

            setLoading(true);

            const response = await getProduct(slug);

            setProduct(response.data);

        }
        catch (error) {

            console.error(error);

        }
        finally {

            setLoading(false);

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
                    />

                </div>

            </section>

            <ProductTabs
                product={product}
            />

            <RelatedProducts
                category={product.category}
                productId={product.id}
            />

            <Footer />

        </>

    );

}

export default Product;