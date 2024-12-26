import { createContext, useContext, useEffect, useState } from "react";
import { checkAuth, login, logout, register } from "../services/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);

    const loginRequest = async (email, password) => {
        // Body
        let res = await login(email, password)

        console.log(res);

        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        return res;
    }

    const registerRequest = async (username, email, password) => {
        // Body
        if ( !username || !email || !password ) return {
            message: "Missing argumants!"
        }

        let registerResponse = await register(username, email, password);

        return registerResponse;
    }

    const logoutRequest = async () => {
        // Header

        let logoutRes = await logout();

        setUser(null);
        localStorage.removeItem("user");

        return logoutRes?.data;
    }

    const checkAuthRequest = async () => {
        // Header

        let userStorage = localStorage.getItem('user');
        if ( userStorage ) {

            let parsed = JSON.parse(userStorage);
            
            setUser(parsed);
            return parsed;
        }

        let authRes = await checkAuth();
        if ( authRes ) {
            localStorage.setItem('user', JSON.stringify(authRes));
            setUser(authRes);

            return authRes;
        }

        return false;
    }

    useEffect(() => {
        checkAuthRequest();
    }, [])
    
    return (
        <AuthContext.Provider value={{
            user,
            loginRequest,
            registerRequest,
            logoutRequest,
            checkAuthRequest
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);