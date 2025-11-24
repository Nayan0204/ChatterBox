
import {  createContext, useContext, useEffect, useState } from "react";
import { connectSocket } from "../socket";

const AuthContext = createContext();

 const AuthProvider = ({ children }) => {
    const [auth , setAuth] = useState({
        user: null,
        token: "",
    });
    const[loading , setLoading] = useState(true);

    useEffect(() => {
        const data = localStorage.getItem("auth")
        if(data){
            try {
                const parseData = JSON.parse(data);
                setAuth({
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

        setLoading(false);
    },[]);

     useEffect(() => {
    if (auth?.token) {
      const s = connectSocket(auth.token);

      s.on("connect", () => {
        console.log("Socket connected:", s.id);
      });

      s.on("receive-message", (msg) => {
        console.log("Message received:", msg);
      });

      return () => s.disconnect();
    }
  }, [auth?.token]);

    return (
        <AuthContext.Provider value = {[auth, setAuth , loading, setLoading]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export {AuthProvider, useAuth};