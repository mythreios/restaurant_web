import { useState, useEffect } from "react";
import { getProducts } from "../services/product";
import { addProductToCart } from "../services/cart";
import { FaChevronRight } from 'react-icons/fa';
import { useCart } from "../context/cartContext";

// CSS
import '../styles/pages/home.css';

function Home() {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {

        await new Promise(resolve => setTimeout(resolve, 500));

        const products = await getProducts();
        setProducts(products);
        setSelectedCategory("Su & İçecek");
      } catch (err) {
        setError('Ürünler alınırken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(); 
  }, []);


  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader"></div>
    </div>
  );
  if (error) return <div>{error}</div>;


  const filteredProducts = selectedCategory
    ? selectedSubcategory
      ? products[selectedCategory][selectedSubcategory]
      : Object.values(products[selectedCategory]).flat()
    : Object.values(products).flat();


  const handleAddToCart = async (productId) => {
    console.log(`Ürün sepete eklendi: ${productId}`);
    let res = await addProductToCart(productId);
    console.log(res);

    if (res && res.currentProductList) {
      addToCart();

      const newNotification = 'Ürün sepete eklendi!';
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { message: newNotification, type: 'success' },
      ]);


      setTimeout(() => {
        setNotifications((prevNotifications) => prevNotifications.slice(1));
      }, 3000);
    } else {

      const newNotification = `${res.message}`;
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { message: newNotification, type: 'error' },
      ]);


      setTimeout(() => {
        setNotifications((prevNotifications) => prevNotifications.slice(1));
      }, 3000);
    }
  };

  return (
    <div className="flex">


      <div className="w-1/4 p-6 bg-white shadow-lg rounded-lg fixed top-16 left-0 bottom-0 z-1">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Kategoriler</h2>
        {Object.keys(products).map((category) => (
          <div key={category} className="mb-4">
            <h3
              className={`font-semibold text-lg cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 ${selectedCategory === category ? "bg-blue-100 text-blue-600" : "text-gray-700"
                }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
              {selectedCategory === category && <FaChevronRight className="ml-2 text-gray-600" />}
            </h3>
            {selectedCategory === category && (
              <div className="pl-4 mt-2">
                {Object.keys(products[category]).map((subcategory) => (
                  <p
                    key={subcategory}
                    className={`text-sm cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 ${selectedSubcategory === subcategory ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-600"
                      }`}
                    onClick={() => handleSubcategoryClick(subcategory)}
                  >
                    {subcategory}
                    {selectedSubcategory === subcategory && (
                      <FaChevronRight className="ml-2 text-gray-600" />
                    )}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>


      <div className="w-3/4 p-6 ml-auto mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between h-full">
              <div>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600 line-clamp-2">{product.description}</p>
              </div>
              <div className="mt-4 flex flex-col items-stretch">
                <p className="text-blue-500 font-bold mb-2 text-lg">₺{product.price}</p>
                <button
                  className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => handleAddToCart(product._id)}
                >
                  Sepete Ekle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="fixed bottom-6 right-6 space-y-2">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className={`py-2 px-4 rounded-lg shadow-lg animate-slide-in ${
              notification.type === 'success'
                ? 'bg-green-500'
                : 'bg-red-500'
            }`}
          >
            {notification.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
