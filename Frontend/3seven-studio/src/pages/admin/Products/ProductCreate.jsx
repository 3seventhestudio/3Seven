import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";

import {
    createProduct,
} from "../../../services/admin/productService";

import {
    getCategoryDropdown,
} from "../../../services/admin/categoryService";

import "./ProductCreate.css";

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

function ProductCreate() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialState);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {

        try {

            const response = await getCategoryDropdown();
            if (response.data.sucess){
                setCategories(response.data.data);
            }

        } catch (error) {
            console.error(error);
        }

    };

    const handleChange = (e) => {

        const { name, value, type, checked, files } = e.target;

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

        setLoading(true);
        setErrors({});

        try {

            const data = new FormData();

            Object.keys(formData).forEach((key) => {

                if (
                    formData[key] !== null &&
                    formData[key] !== ""
                ) {
                    data.append(key, formData[key]);
                }

            });

            const response = await createProduct(data);

            if (response.success) {

                navigate("/admin/products");

            } else {

                alert(response.message);

            }

        } catch (error) {

            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="admin-page">

            <PageHeader
                title="Create Product"
                subtitle="Add a new product"
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
                        required
                    >

                        <option value="">
                            Select Category
                        </option>

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
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <small>{errors.name}</small>

                </div>

                <div className="form-group">

                    <label>Slug</label>

                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-group">

                    <label>SKU</label>

                    <input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                        required
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
                        required
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

                    <label>Stock</label>

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

                    <label>Thumbnail</label>

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
                        disabled={loading}
                    >
                        {loading
                            ? "Saving..."
                            : "Create Product"}
                    </button>

                </div>

            </form>

        </div>

    );
}

export default ProductCreate;