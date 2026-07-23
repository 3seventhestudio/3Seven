import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaEdit,
    FaPlus,
    FaTrash,
} from "react-icons/fa";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";
import {
    getProducts,
    deleteProduct,
} from "../../../services/admin/productService";

import "./ProductList.css";

function ProductList() {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {

        try {

            setLoading(true);

            const response = await getProducts();

            if (response.success) {
                setProducts(response.data);
            } else {
                setError(response.message);
            }

        } catch (err) {

            console.error(err);

            setError("Failed to load products.");

        } finally {

            setLoading(false);

        }
    };

    const handleDelete = async (productId) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) {
            return;
        }

        try {

            const response = await deleteProduct(productId);

            if (response.success) {

                loadProducts();

            } else {

                alert(response.message);

            }

        } catch (err) {

            console.error(err);

            alert("Unable to delete product.");

        }

    };

    return (
        <div className="admin-page">

            <PageHeader
                title="Products"
                subtitle="Manage your products"
                action={
                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            navigate("/admin/products/create")
                        }
                    >
                        <FaPlus />
                        <span>Add Product</span>
                    </button>
                }
            />

            {loading && (

                <div className="admin-card">

                    <p>Loading products...</p>

                </div>

            )}

            {!loading && error && (

                <div className="admin-card">

                    <p>{error}</p>

                </div>

            )}

            {!loading && !error && (

                <div className="admin-card">

                    <table className="admin-table">

                        <thead>

                            <tr>

                                <th>Image</th>

                                <th>Name</th>

                                <th>SKU</th>

                                <th>Category</th>

                                <th>Price</th>

                                <th>Stock</th>

                                <th>Featured</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {products.length === 0 && (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="text-center"
                                    >
                                        No products found.
                                    </td>

                                </tr>

                            )}

                            {products.map((product) => (

                                <tr key={product.id}>

                                    <td>

                                        {product.thumbnail ? (

                                            <img
                                                src={product.thumbnail}
                                                alt={product.name}
                                                className="product-thumb"
                                            />

                                        ) : (

                                            "-"

                                        )}

                                    </td>

                                    <td>{product.name}</td>

                                    <td>{product.sku}</td>

                                    <td>{product.category}</td>

                                    <td>₹ {product.price}</td>

                                    <td>{product.stock_quantity}</td>

                                    <td>

                                        {product.featured
                                            ? "Yes"
                                            : "No"}

                                    </td>

                                    <td>

                                        <button
                                            className="btn-icon edit"
                                            onClick={() =>
                                                navigate(
                                                    `/admin/products/${product.id}/edit`
                                                )
                                            }
                                        >
                                            <FaEdit />
                                        </button>

                                        <button
                                            className="btn-icon delete"
                                            onClick={() =>
                                                handleDelete(product.id)
                                            }
                                        >
                                            <FaTrash />
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
}

export default ProductList;