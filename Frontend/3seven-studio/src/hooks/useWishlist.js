import { useState, useEffect, useCallback } from "react";
import {
    getWishlist,
    toggleWishlist,
    removeFromWishlist,
} from "../services/wishlistService";

export function useWishlist() {

    const [wishlistItems, setWishlistItems] = useState([]);
    const [wishlistIds, setWishlistIds] = useState(new Set());
    const [loading, setLoading] = useState(false);

    const loadWishlist = useCallback(async () => {

        try {

            setLoading(true);

            const response = await getWishlist();
            const items = response.data || [];

            setWishlistItems(items);

            setWishlistIds(
                new Set(items.map((item) => item.product.id))
            );

        } catch (error) {

            console.error("Failed to load wishlist:", error);
            setWishlistItems([]);
            setWishlistIds(new Set());

        } finally {

            setLoading(false);

        }

    }, []);

    const toggle = useCallback(async (productId) => {

        try {

            const response = await toggleWishlist(productId);

            await loadWishlist();

            return response.data?.in_wishlist;

        } catch (error) {

            console.error("Failed to toggle wishlist:", error);
            throw error;

        }

    }, [loadWishlist]);

    const remove = useCallback(async (itemId) => {

        try {

            await removeFromWishlist(itemId);

            await loadWishlist();

        } catch (error) {

            console.error("Failed to remove from wishlist:", error);
            throw error;

        }

    }, [loadWishlist]);

    const isInWishlist = useCallback((productId) => {

        return wishlistIds.has(productId);

    }, [wishlistIds]);

    useEffect(() => {

        const token = localStorage.getItem("access_token");

        if (token) {
            loadWishlist();
        }

    }, [loadWishlist]);

    return {
        wishlistItems,
        loading,
        toggle,
        remove,
        isInWishlist,
        loadWishlist,
        wishlistCount: wishlistItems.length,
    };

}
