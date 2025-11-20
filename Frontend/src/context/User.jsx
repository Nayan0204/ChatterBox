import {  createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

 const AuthProvider = ({ children }) => {
    const [auth , setAuth] = useState({
        user: null,
        token: "",
    });

    useEffect(() => {
        const data = localStorage.getItem("auth")
        if(data){
            try {
                const parseData = JSON.parse(data);
                setAuth({
                    ...auth,
                    user: parseData.user,
                    token: parseData.token,
                })

            } catch (error) {
                console.log("Error parsing auth data from localStorage", error);
            }
        }
        else {
            console.log("No auth data found in localStorage");
        }
    })

    return (
        <AuthContext.Provider value = {[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export {AuthProvider, useAuth};