import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";

import {
    getCategories,
    deleteCategory,
} from "../../../services/admin/categoryService";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadCategories = async () => {
        try {
            setLoading(true);

            const response = await getCategories();

            setCategories(response.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this category?")) return;

        try {
            await deleteCategory(id);
            loadCategories();
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <PageHeader
                title="Categories"
                subtitle="Manage product categories"
                actionText="Add Category"
                actionLink="/admin/categories/create"
            />

            <div className="card">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Slug</th>
                                <th>Display Order</th>
                                <th>Status</th>
                                <th width="180">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {categories.length === 0 && (
                                <tr>
                                    <td colSpan="6">
                                        No categories found.
                                    </td>
                                </tr>
                            )}

                            {categories.map((category) => (
                                <tr key={category.id}>
                                    <td>
                                        {category.image_url ? (
                                            <img
                                                src={category.image_url}
                                                alt={category.name}
                                                width={60}
                                            />
                                        ) : (
                                            "-"
                                        )}
                                    </td>

                                    <td>{category.name}</td>

                                    <td>{category.slug}</td>

                                    <td>{category.display_order}</td>

                                    <td>
                                        {category.is_active
                                            ? "Active"
                                            : "Inactive"}
                                    </td>

                                    <td>
                                        <Link
                                            className="btn btn-primary btn-sm"
                                            to={`/admin/categories/${category.id}/edit`}
                                        >
                                            Edit
                                        </Link>

                                        {" "}

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                handleDelete(category.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default CategoryList;