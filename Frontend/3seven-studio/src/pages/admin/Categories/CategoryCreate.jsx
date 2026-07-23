import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";
import { createCategory } from "../../../services/admin/categoryService";

const CategoryCreate = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        display_order: 0,
        is_active: true,
        image: null,
    });

    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === "file") {
            const file = files[0];

            setFormData((prev) => ({
                ...prev,
                image: file,
            }));

            if (file) {
                setPreview(URL.createObjectURL(file));
            }

            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createCategory(formData);
            navigate("/admin/categories");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <PageHeader
                title="Add Category"
                subtitle="Create new category"
            />

            <div className="card">
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            className="form-control"
                            rows="4"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Display Order</label>
                        <input
                            className="form-control"
                            type="number"
                            name="display_order"
                            value={formData.display_order}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Image</label>
                        <input
                            className="form-control"
                            type="file"
                            accept="image/*"
                            onChange={handleChange}
                        />
                    </div>

                    {preview && (
                        <div className="form-group">
                            <img
                                src={preview}
                                alt="Preview"
                                width={150}
                            />
                        </div>
                    )}

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="is_active"
                            checked={formData.is_active}
                            onChange={handleChange}
                        />

                        <label className="form-check-label">
                            Active
                        </label>
                    </div>

                    <br />

                    <button
                        className="btn btn-primary"
                        type="submit"
                    >
                        Save Category
                    </button>

                </form>
            </div>
        </>
    );
};

export default CategoryCreate;