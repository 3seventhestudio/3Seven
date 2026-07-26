import { useState } from "react";
import { FileText, Info, Truck } from "lucide-react";

import "./ProductTabs.css";

function ProductTabs({ product }) {

    const [activeTab, setActiveTab] = useState("description");

    const tabs = [
        { id: "description", label: "Description", icon: FileText },
        { id: "additional", label: "Additional Info", icon: Info },
        { id: "shipping", label: "Shipping & Returns", icon: Truck },
    ];

    return (

        <section className="product-tabs-section">

            <div className="product-tabs-container">

                <div className="tabs-header">

                    {tabs.map((tab) => {

                        const Icon = tab.icon;

                        return (

                            <button
                                key={tab.id}
                                className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                                onClick={() => setActiveTab(tab.id)}
                            >

                                <Icon size={16} />
                                {tab.label}

                            </button>

                        );

                    })}

                </div>

                <div className="tab-content">

                    {activeTab === "description" && (

                        <div className="tab-pane">

                            {product.description ? (

                                <div
                                    className="prose"
                                    dangerouslySetInnerHTML={{
                                        __html: product.description,
                                    }}
                                />

                            ) : (

                                <p className="text-gray-500">
                                    No description available for this product.
                                </p>

                            )}

                        </div>

                    )}

                    {activeTab === "additional" && (

                        <div className="tab-pane">

                            <table className="info-table">
                                <tbody>
                                    {product.sku && (
                                        <tr>
                                            <td className="info-label">SKU</td>
                                            <td>{product.sku}</td>
                                        </tr>
                                    )}
                                    {product.category && (
                                        <tr>
                                            <td className="info-label">Category</td>
                                            <td>{product.category}</td>
                                        </tr>
                                    )}
                                    {product.variants?.length > 0 && (
                                        <>
                                            <tr>
                                                <td className="info-label">Available Sizes</td>
                                                <td>
                                                    {[...new Set(product.variants.map((v) => v.size))].join(", ")}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="info-label">Available Colors</td>
                                                <td>
                                                    {[...new Set(product.variants.map((v) => v.color))].join(", ")}
                                                </td>
                                            </tr>
                                        </>
                                    )}
                                </tbody>
                            </table>

                        </div>

                    )}

                    {activeTab === "shipping" && (

                        <div className="tab-pane">

                            <div className="shipping-info">

                                <div className="shipping-item">
                                    <h4>Shipping</h4>
                                    <p>
                                        Free shipping on orders above ₹1,999. Standard delivery takes
                                        5–7 business days. Express delivery available at checkout.
                                    </p>
                                </div>

                                <div className="shipping-item">
                                    <h4>Returns & Exchange</h4>
                                    <p>
                                        Easy 7-day returns. Items must be unused and in original packaging.
                                        Exchanges are subject to availability.
                                    </p>
                                </div>

                                <div className="shipping-item">
                                    <h4>Care Instructions</h4>
                                    <p>
                                        Hand wash or gentle machine wash in cold water. Do not bleach.
                                        Hang dry in shade. Iron on low heat.
                                    </p>
                                </div>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </section>

    );

}

export default ProductTabs;