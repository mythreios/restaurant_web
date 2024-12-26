import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useCart } from '../context/cartContext';

function Register() {
    const { registerRequest } = useAuth();
    const { setDirectlyCount } = useCart();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');

        if (password !== confirmPassword) {
            setError('Şifreler uyuşmuyor!');
            return;
        }

        try {
            let res = await registerRequest(name, email, password);
            console.log(res);
            if ( res && res.isRegistered == false ) {
                alert('Mail zaten kayıtlı');
                return navigate('/register');
            }

            alert('Kayıt başarılı! Giriş yapabilirsiniz.');
            setDirectlyCount(0);
            navigate('/login');
        } catch (err) {
            setError('Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin. ' + err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-20">
                <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
                    Hesap Oluştur
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            İsim
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mt-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Adınızı girin"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email Adresi
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Email adresinizi girin"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Şifre
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Şifrenizi oluşturun"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Şifreyi Doğrula
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full mt-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Şifrenizi tekrar girin"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Kayıt Ol
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-4">
                    Zaten hesabınız var mı?{' '}
                    <a
                        href="/login"
                        className="text-blue-600 hover:underline"
                    >
                        Giriş Yap
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Register;
