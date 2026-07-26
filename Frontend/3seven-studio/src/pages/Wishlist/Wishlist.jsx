import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";

import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";

import { getWishlist, removeFromWishlist } from "../../services/wishlistService";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

import "./Wishlist.css";

function Wishlist() {

    const { isAuthenticated } = useAuth();
    const { addToCart } = useCart();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (isAuthenticated) {
            fetchWishlist();
        } else {
            setLoading(false);
        }

    }, [isAuthenticated]);

    const fetchWishlist = async () => {

        try {

            setLoading(true);

            const response = await getWishlist();

            setItems(response.data || []);

        } catch (error) {

            console.error("Failed to load wishlist:", error);

        } finally {

            setLoading(false);

        }

    };

    const handleRemove = async (itemId) => {

        try {

            await removeFromWishlist(itemId);

            setItems((prev) => prev.filter((item) => item.id !== itemId));

            toast.success("Removed from wishlist.");

        } catch (error) {

            toast.error("Failed to remove item.");

        }

    };

    const handleMoveToCart = async (item) => {

        try {

            const product = item.product;

            await addToCart(product.id, 1, {
                id: product.id,
                product_name: product.name,
                product_slug: product.slug,
                thumbnail: product.thumbnail,
                price: Number(product.price),
            });

            await removeFromWishlist(item.id);
            setItems((prev) => prev.filter((i) => i.id !== item.id));

            toast.success("Moved to cart.");

        } catch (error) {

            toast.error("Failed to move to cart. Please select a variant on the product page.");

        }

    };

    if (!isAuthenticated) {

        return (

            <>

                <Navbar />

                <Breadcrumb
                    items={[
                        { label: "Home", link: "/" },
                        { label: "Wishlist" },
                    ]}
                />

                <section className="wishlist-page">

                    <div className="container">

                        <div className="wishlist-empty">

                            <Heart size={64} strokeWidth={1} />

                            <h2>Please log in to view your wishlist</h2>

                            <p>
                                Sign in to save your favourite items and access them anytime.
                            </p>

                            <Link to="/login" className="wishlist-cta-btn">
                                Sign In
                                <ArrowRight size={18} />
                            </Link>

                        </div>

                    </div>

                </section>

                <Footer />

            </>

        );

    }

    return (

        <>

            <Navbar />

            <Breadcrumb
                items={[
                    { label: "Home", link: "/" },
                    { label: "Wishlist" },
                ]}
            />

            <section className="wishlist-page">

                <div className="container">

                    <div className="wishlist-header">

                        <h1>
                            <Heart size={24} />
                            My Wishlist
                        </h1>

                        {items.length > 0 && (

                            <p>
                                {items.length} {items.length === 1 ? "item" : "items"} saved
                            </p>

                        )}

                    </div>

                    {loading ? (

                        <div className="wishlist-loading">
                            Loading your wishlist...
                        </div>

                    ) : items.length === 0 ? (

                        <div className="wishlist-empty">

                            <Heart size={64} strokeWidth={1} />

                            <h2>Your wishlist is empty</h2>

                            <p>
                                Start adding items you love and come back to them anytime.
                            </p>

                            <Link to="/shop" className="wishlist-cta-btn">
                                Start Shopping
                                <ArrowRight size={18} />
                            </Link>

                        </div>

                    ) : (

                        <div className="wishlist-grid">

                            {items.map((item) => {

                                const product = item.product;

                                return (

                                    <div key={item.id} className="wishlist-card">

                                        <Link
                                            to={`/product/${product.slug}`}
                                            className="wishlist-image-wrapper"
                                        >

                                            <img
                                                src={product.thumbnail}
                                                alt={product.name}
                                                className="wishlist-image"
                                            />

                                        </Link>

                                        <div className="wishlist-card-body">

                                            <Link
                                                to={`/product/${product.slug}`}
                                                className="wishlist-product-name"
                                            >
                                                {product.name}
                                            </Link>

                                            {product.category_name && (

                                                <span className="wishlist-category">
                                                    {product.category_name}
                                                </span>

                                            )}

                                            <div className="wishlist-price-row">

                                                <span className="wishlist-price">
                                                    ₹{Number(product.price).toLocaleString()}
                                                </span>

                                                {product.compare_price && Number(product.compare_price) > Number(product.price) && (

                                                    <span className="wishlist-compare-price">
                                                        ₹{Number(product.compare_price).toLocaleString()}
                                                    </span>

                                                )}

                                            </div>

                                            <div className="wishlist-stock">
                                                {product.in_stock ? (
                                                    <span className="in-stock">In Stock</span>
                                                ) : (
                                                    <span className="out-of-stock">Out of Stock</span>
                                                )}
                                            </div>

                                            <div className="wishlist-actions">

                                                <Link
                                                    to={`/product/${product.slug}`}
                                                    className="wishlist-view-btn"
                                                >
                                                    <ShoppingBag size={15} />
                                                    View Product
                                                </Link>

                                                <button
                                                    className="wishlist-remove-btn"
                                                    onClick={() => handleRemove(item.id)}
                                                    title="Remove from wishlist"
                                                >
                                                    <Trash2 size={16} />
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                );

                            })}

                        </div>

                    )}

                </div>

            </section>

            <Footer />

        </>

    );

}

export default Wishlist;
