import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useCart } from '../context/cartContext';

const Navbar = () => {
    const { user, logoutRequest } = useAuth();
    const { cartItemCount, setDirectlyCount } = useCart();

    const handleLogout = async () => {
        setDirectlyCount(0);
        await logoutRequest();
    };

    useEffect(() => {

    }, [cartItemCount]);

    return (
        <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center fixed top-0 left-0 w-full z-50">
            {/* Sol kısım - Logo */}
            <div className="text-2xl font-bold text-blue-600">
                <Link to="/">İbonun Yeri</Link>
            </div>

            {/* Sağ kısım - Kullanıcı ve Sepet */}
            <div className="flex items-center space-x-4">
                {/* Sepet İkonu */}
                <Link
                    to="/cart"
                    className="relative text-gray-700 hover:text-blue-600"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.4 2l.4-2m-1 4h15.6a2 2 0 01.8 3.8L18 21H6l-2.8-5.6A2 2 0 014 13z"
                        />
                    </svg>
                    {/* Sepetteki ürün sayısı */}
                    {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {cartItemCount}
                        </span>
                    )}
                </Link>

                {/* Kullanıcı Girişi */}
                {user ? (
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-700 font-medium">
                            Merhaba, {user.username}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
                        >
                            Çıkış Yap
                        </button>
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
                    >
                        Giriş Yap
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
