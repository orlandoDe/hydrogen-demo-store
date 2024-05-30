import React, { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * FavoritesRoute Component
 * Displays the user's favorite products and the top global favorite products.
 */
export default function FavoritesRoute() {
    // State to store user's favorite products
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    // State to store global favorite products
    const [globalFavoriteProducts, setGlobalFavoriteProducts] = useState([]);
    // Base URL for the backend API
    const api_base_url = import.meta.env.VITE_BACKEND_MONGO_URL;
    // State to store the current logged-in user's ID
    const [loginUsr, setLoginUsr] = useState(null);

    /**
     * Fetch the current user ID from the backend when the component mounts
     * ONLY FOR DEMO/SANDBOX IMPERSONATE CUSTOM USER!!
     */
    if (true) {
    useEffect(() => {
        axios.get(`${api_base_url}/api/current-user`)
            .then(response => setLoginUsr(response.data.userId))
            .catch(error => console.error('Error fetching current-user:', error));
    }, []);
    }else{
       // setLoginUsr(session.customerAccount().id)
    }

    /**
     * Fetch the user's favorite products whenever the loginUsr state changes
     */
    useEffect(() => {
        if (loginUsr !== null) {
            axios.get(`${api_base_url}/api/favorites/${loginUsr}`)
                .then(response => setFavoriteProducts(response.data))
                .catch(error => console.error('Error fetching favorite products:', error));
        }
    }, [loginUsr]);

    /**
     * Fetch the global favorite products when the component mounts
     * Sort the products in descending order based on the count property
     */
    useEffect(() => {
        axios.get(`${api_base_url}/api/global-favorites`)
            .then(response => {
                const sortedProducts = response.data.sort((a, b) => b.count - a.count);
                setGlobalFavoriteProducts(sortedProducts);
            })
            .catch(error => console.error('Error fetching global favorite products:', error));
    }, []);

    return (
        <>
            {/* User's Favorite Products */}
            <div className='collection'>
                <h1>Your Favorite Products</h1>
                {favoriteProducts.length === 0 ? (
                    <div className='empty-message'>
                        <p>Looks empty around here, add something you like.</p>
                    </div>
                ) : (
                    <div className='products-grid-favorite'>
                        {favoriteProducts.map(product => (
                            <a key={product.productId} className='product-item-favorite' href={product.url}>
                                <img src={product.productImgUrl} alt={product.productTitle} />
                                <h4>{product.productTitle}</h4>
                            </a>
                        ))}
                    </div>
                )}
            </div>
            {/* Global Favorites */}
            <div className='collection'>
                <h1>Top 3 Peoples Favorites</h1>
                {globalFavoriteProducts.length === 0 ? (
                    <div className='empty-message'>
                        <p>Be the first #1...</p>
                    </div>
                ) : (
                    <div className='products-grid-favorite-all'>
                        {globalFavoriteProducts.slice(0, 3).map(product => (
                            <a key={product.productId} alt={product.productDescription} className='product-item' href={product.url}>
                                <small>
                                    <h4>({product.count}) {product.productTitle}</h4>
                                </small>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
