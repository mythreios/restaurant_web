import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] bg-gray-100 text-center">
            <div className="p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-6xl font-extrabold text-blue-600">404</h1>
                <h2 className="text-3xl text-gray-700 mt-4">Sayfa Bulunamadı</h2>
                <p className="text-lg text-gray-500 mt-2">Sanırsam sayfa bulunamadı. :D</p>
                <Link
                    to="/"
                    className="mt-6 inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300"
                >
                    Anasayfaya Git
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
