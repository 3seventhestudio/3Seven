import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";
import {
    getProduct,
    updateProduct,
} from "../../../services/admin/productService";
import {
    getCategoryDropdown,
} from "../../../services/admin/categoryService";

import "./ProductEdit.css";

const initialState = {
    category: "",
    name: "",
    slug: "",
    sku: "",
    short_description: "",
    description: "",
    price: "",
    compare_price: "",
    stock_quantity: "",
    featured: false,
    new_arrival: false,
    best_seller: false,
    thumbnail: null,
};

function ProductEdit() {

    const navigate = useNavigate();
    const { productId } = useParams();

    const [formData, setFormData] = useState(initialState);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        try {

            const [categoryResponse, productResponse] =
                await Promise.all([
                    getCategoryDropdown(),
                    getProduct(productId),
                ]);

            if (categoryResponse.success) {
                setCategories(categoryResponse.data);
            }

            if (productResponse.success) {

                const product = productResponse.data;

                setFormData({
                    category: product.category,
                    name: product.name,
                    slug: product.slug,
                    sku: product.sku,
                    short_description: product.short_description || "",
                    description: product.description || "",
                    price: product.price,
                    compare_price: product.compare_price || "",
                    stock_quantity: product.stock_quantity,
                    featured: product.featured,
                    new_arrival: product.new_arrival,
                    best_seller: product.best_seller,
                    thumbnail: null,
                });

            }

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        const { name, value, checked, type, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : type === "file"
                    ? files[0]
                    : value,
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);
        setErrors({});

        try {

            const data = new FormData();

            Object.entries(formData).forEach(([key, value]) => {

                if (
                    value !== "" &&
                    value !== null
                ) {
                    data.append(key, value);
                }

            });

            const response = await updateProduct(
                productId,
                data
            );

            if (response.success) {

                navigate("/admin/products");

            }

        } catch (error) {

            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }

        } finally {

            setSaving(false);

        }

    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (

        <div className="admin-page">

            <PageHeader
                title="Edit Product"
                subtitle="Update product information"
            />

            <form
                className="admin-form"
                onSubmit={handleSubmit}
            >

                <div className="form-group">

                    <label>Category</label>

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >

                        {categories.map((category) => (

                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>

                        ))}

                    </select>

                </div>

                <div className="form-group">

                    <label>Name</label>

                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <small>{errors.name}</small>

                </div>

                <div className="form-group">

                    <label>Slug</label>

                    <input
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-group">

                    <label>SKU</label>

                    <input
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-group">

                    <label>Price</label>

                    <input
                        type="number"
                        step="0.01"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-group">

                    <label>Compare Price</label>

                    <input
                        type="number"
                        step="0.01"
                        name="compare_price"
                        value={formData.compare_price}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-group">

                    <label>Stock Quantity</label>

                    <input
                        type="number"
                        name="stock_quantity"
                        value={formData.stock_quantity}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-group">

                    <label>Short Description</label>

                    <textarea
                        rows="2"
                        name="short_description"
                        value={formData.short_description}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-group">

                    <label>Description</label>

                    <textarea
                        rows="5"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-group">

                    <label>Replace Thumbnail</label>

                    <input
                        type="file"
                        name="thumbnail"
                        onChange={handleChange}
                    />

                </div>

                <div className="checkbox-group">

                    <label>
                        <input
                            type="checkbox"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleChange}
                        />
                        Featured
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            name="new_arrival"
                            checked={formData.new_arrival}
                            onChange={handleChange}
                        />
                        New Arrival
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            name="best_seller"
                            checked={formData.best_seller}
                            onChange={handleChange}
                        />
                        Best Seller
                    </label>

                </div>

                <div className="form-actions">

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/admin/products")}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={saving}
                    >
                        {saving ? "Updating..." : "Update Product"}
                    </button>

                </div>

            </form>

        </div>

    );

}

export default ProductEdit;