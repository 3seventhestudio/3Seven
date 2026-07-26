import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {

        const accessToken = localStorage.getItem("access_token");
        const savedUser = localStorage.getItem("user");

        if (accessToken && savedUser) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        }

    }, []);

    useEffect(() => {
        const handleAuthLogout = () => {
            logout();
            window.location.href = "/login?expired=true";
        };

        window.addEventListener("auth-logout", handleAuthLogout);
        return () => {
            window.removeEventListener("auth-logout", handleAuthLogout);
        };
    }, []);

    const login = (userData, accessToken, refreshToken) => {

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);

        setUser(userData);
        setIsAuthenticated(true);

    };

    const logout = () => {

        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        setUser(null);
        setIsAuthenticated(false);

    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => useContext(AuthContext);