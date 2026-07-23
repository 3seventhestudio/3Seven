import { useEffect, useState } from "react";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";

import {
    getInventory,
    updateInventory,
} from "../../../services/admin/inventoryService";

const InventoryList = () => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadInventory = async () => {
        try {
            setLoading(true);

            const response = await getInventory();

            setInventory(response.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadInventory();
    }, []);

    const handleStockUpdate = async (variant, type) => {
        const quantity = prompt("Enter quantity");

        if (!quantity) return;

        try {
            await updateInventory(variant.id, {
                transaction_type: type,
                quantity: Number(quantity),
                remarks: "",
            });

            loadInventory();
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
                title="Inventory"
                subtitle="Manage inventory stock"
            />

            <div className="card">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>SKU</th>
                                <th>Size</th>
                                <th>Color</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th width="220">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {inventory.length === 0 && (
                                <tr>
                                    <td colSpan="7">
                                        No inventory found.
                                    </td>
                                </tr>
                            )}

                            {inventory.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.product}</td>
                                    <td>{item.sku}</td>
                                    <td>{item.size}</td>
                                    <td>{item.color}</td>
                                    <td>₹ {item.price}</td>
                                    <td>{item.stock_quantity}</td>

                                    <td>
                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() =>
                                                handleStockUpdate(item, "IN")
                                            }
                                        >
                                            Stock In
                                        </button>

                                        {" "}

                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={() =>
                                                handleStockUpdate(item, "OUT")
                                            }
                                        >
                                            Stock Out
                                        </button>

                                        {" "}

                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() =>
                                                handleStockUpdate(item, "ADJUSTMENT")
                                            }
                                        >
                                            Adjust
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

export default InventoryList;