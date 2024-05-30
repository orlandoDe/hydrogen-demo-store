import React, { useState, useEffect } from 'react';
import { getClientBrowserParameters } from '@shopify/hydrogen-react';
import axios from 'axios';

/**
 * FavoriteBtn component
 * Handles the favoriting functionality for a product.
 * 
 * @param {Object} productId - Object containing product information.
 */
export function FavoriteBtn(productId) {
    // State to track if the product is favorited / current logged-in user's ID
    const [isFavorited, setIsFavorited] = useState(false);
    const [loginUsr, setLoginUsr] = useState(null);
    // Backend API base URL from environment variables
    const api_base_url = import.meta.env.VITE_BACKEND_MONGO_URL;
    // Extracting product ID and product object from props
    const product_id = productId.productId;
    const product = productId.productObj;

    /**
     * useEffect to fetch the current user ID from the backend
     * Runs once when the component mounts or when product_id changes 
     * ONLY FOR DEMO/SANDBOX IMPERSONATE CUSTOM USER!!
     */
    if (true) {
        useEffect(() => {
            axios.get(`${api_base_url}/api/current-user`)
                .then(response => setLoginUsr(response.data.userId))
                .catch(error => console.error('Error fetching current-user:', error));
        }, [product_id]);
    }else{
        // setLoginUsr(session.customerAccount().id)
    }

    /**
     * useEffect to check if the product is favorited by the current user
     * Runs whenever loginUsr changes
     */
    useEffect(() => {
        if (loginUsr != null) {
            axios.get(`${api_base_url}/api/favorite/${loginUsr}/${product_id}`)
                .then(response => setIsFavorited(response.data.isFavorited))
                .catch(error => console.error('Error fetching favorite status:', error));
        }
    }, [loginUsr]);

    /**
     * Handles the favorite/unfavorite button click
     */
    const handleFavoriteClick = () => {
        // Get the current URL for later use in favorite
        const currentUrl = getClientBrowserParameters().url;

        if (isFavorited) {
            // If the product is already favorited, remove it from favorites
            axios.delete(`${api_base_url}/api/favorite/${product_id}`, { data: { userId: loginUsr } })
                .then(() => setIsFavorited(false))
                .catch(error => console.error('Error removing favorite:', error));
        } else {
            // If the product is not favorited, add it to favorites
            axios.post(`${api_base_url}/api/favorite`, {
                productId: product_id,
                userId: loginUsr,
                productTitle: product.selectedVariant.product.title,
                productImgUrl: product.selectedVariant.image.url,
                productDescription: product.description,
                url: currentUrl
            })
                .then(() => setIsFavorited(true))
                .catch(error => console.error('Error adding favorite:', error));
        }
    };

    return (
        <button className='btn' role="button" onClick={handleFavoriteClick}>
            <span className="text">{isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}</span>
        </button>
    );
}
