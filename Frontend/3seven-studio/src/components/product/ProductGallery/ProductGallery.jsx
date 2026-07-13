import { useEffect, useState } from "react";
import "./ProductGallery.css";

function ProductGallery({ product }) {

    const images = [
        ...(product.thumbnail
            ? [{
                image: product.thumbnail,
                alt_text: product.name,
            }]
            : []),
        ...(product.images || []),
    ];

    const [selectedImage, setSelectedImage] = useState(
        images.length ? images[0].image : ""
    );

    useEffect(() => {

        if (images.length) {
            setSelectedImage(images[0].image);
        }

    }, [product]);

    return (

        <div className="product-gallery">

            <div className="thumbnail-list">

                {
                    images.map((item, index) => (

                        <button
                            key={index}
                            className={`thumbnail-btn ${
                                selectedImage === item.image ? "active" : ""
                            }`}
                            onClick={() => setSelectedImage(item.image)}
                        >

                            <img
                                src={item.image}
                                alt={item.alt_text || product.name}
                            />

                        </button>

                    ))
                }

            </div>

            <div className="main-image">

                <img
                    src={selectedImage}
                    alt={product.name}
                />

            </div>

        </div>

    );

}

export default ProductGallery;