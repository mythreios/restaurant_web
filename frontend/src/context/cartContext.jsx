import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCart } from '../services/cart';

// Sepet Context
const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItemCount, setCartItemCount] = useState(0);

    const addToCart = () => {
        setCartItemCount(prev => prev + 1);
    };

    const removeFromCart = () => {
        console.log('detect');
        if (cartItemCount > 0) {
            setCartItemCount(prev => prev > 0 ? prev - 1 : 0);
        }
    };

    const setDirectlyCount = () => {
        setCartItemCount(0);
    }

    const setOriginalCountFn = async () => {
        let data = await getCart();
        if ( data && data.list ) {
            setCartItemCount(data.list.length);
        }
    }

    useEffect(() => {
        
        const fetchCart = async () => {
            let res = await getCart();
            if ( res ) {
                console.log(res);
                setCartItemCount(res.list ? res.list.length : 0);
            }
        }

        fetchCart();

    }, [])

    return (
        <CartContext.Provider value={{
            cartItemCount, addToCart, removeFromCart, setDirectlyCount, setOriginalCountFn
        }}>
            {children}
        </CartContext.Provider>
    );
};
