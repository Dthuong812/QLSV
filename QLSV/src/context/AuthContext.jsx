import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [studentName, setStudentName] = useState(localStorage.getItem("studentName") || "");
    const [token, setToken] = useState(localStorage.getItem("accessToken") || "");

    useEffect(() => {
        const storedName = localStorage.getItem("studentName");
        const storedToken = localStorage.getItem("accessToken");
        if (storedName && storedToken) {
            setStudentName(storedName);
            setToken(storedToken);
        }
    }, []);

    const login = (name, token) => {
        console.log("Saving to localStorage:", { name, token });
    
        localStorage.setItem("accessToken", token);
        localStorage.setItem("studentName", name);
        
        setStudentName(name);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("studentName");
        setStudentName("");
        setToken("");
    };

    return (
        <AuthContext.Provider value={{ studentName, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
