import { useState, useEffect } from "react";
import { getCart, removeProductFromCart } from "../services/cart";
import { useNavigate } from "react-router-dom"

import '../styles/pages/home.css';
import { useCart } from "../context/cartContext";

function Home() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { removeFromCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 500));

                const cart = await getCart();
                if ( !cart || !cart.list ) {
                    return navigate("/login");
                }
                
                setCart(cart.list);

            } catch (err) {
                setError('Ürünler alınırken bir hata oluştu.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [cart]);

    const handleRemoveFromCart = async (_id) => {

        let res = await removeProductFromCart(_id);
        console.log(res);
        if (res && res.success) {
            removeFromCart();
            setCart(res.currentProductList);
        }
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, product) => total + product.price, 0);
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="loader"></div>
        </div>
    );
    if (error) return <div>{error}</div>;

    return (
        <div className="flex h-screen pt-16">


            <div className="w-1/2 p-6 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">Ürünler</h2>
                <div className="space-y-4">
                    {Object.values(cart).flat().map((product, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-center">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-24 h-24 object-cover rounded-lg mr-4"
                            />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                <p className="text-gray-600 text-sm">{product.description}</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <p className="text-blue-500 font-bold text-lg mb-2">₺{product.price}</p>
                                <button
                                    className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    onClick={() => handleRemoveFromCart(product._id)}
                                >
                                    Sepetten Çıkar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>



            <div className="w-1/2 p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Sepet</h2>
                {cart.length > 0 ? (
                    <ul className="space-y-4">
                        {cart.map((item, index) => (
                            <li key={index} className="flex justify-between">
                                <span>{item.name}</span>
                                <span>₺{item.price}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Sepet boş</p>
                )}
                
                <div className="mt-4 font-bold text-xl border-t pt-4">
                    Toplam: ₺{calculateTotalPrice().toFixed(2)}
                </div>
            </div>
        </div>
    );
}

export default Home;
