import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cartContext';

function Login() {
    const { loginRequest } = useAuth();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');

    const navigate = useNavigate();

    const { checkAuthRequest } = useAuth();
    const { setDirectlyCount, setOriginalCountFn } = useCart(); 

    useEffect(() => {

        const testFn = async () => {
            let a = await checkAuthRequest();
            if ( a ) {
                navigate("/");
            }
        }
        
        testFn();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            let log = await loginRequest(email, password);
            if ( log && log.message != "Success" ) {
                return setError("Giriş başarısız oldu. Lütfen bilgilerinizi kontrol edin.");
            }

            alert('Giriş başarılı!');
            setOriginalCountFn();

            navigate("/");
        } catch (err) {
            setError('Giriş başarısız oldu. ' + err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
                    Hesabınıza Giriş Yapın
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
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
                            placeholder="Şifrenizi girin"
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
                        Giriş Yap
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-4">
                    Hesabınız yok mu?{' '}
                    <a
                        href="/register"
                        className="text-blue-600 hover:underline"
                    >
                        Kayıt Ol
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;
