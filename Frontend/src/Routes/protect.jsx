import { useEffect, useState } from "react";  
import { useAuth } from "../context/User";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";          
import Spinner from "../components/Spinner";

export default function ProtectAuth() {
    const [ok, setOk] = useState(null);
    const [auth,setAuth ,loading] = useAuth(); 
    


    useEffect(() => {
        if(loading) return; 
        const authcheck = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/auth/api/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${auth?.token}`,
                        },
                    }
                );

                console.log("Protected route response", res);

                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }

            } catch (error) {
                console.log("Auth check failed", error);
                setOk(false);
            }
        };

        if (auth?.token) {
            authcheck();
        }
        else {
            setOk(false);
        }
    }, [auth?.token , loading]);

    if (loading) {
    return <Spinner />;
  }

    if (ok === null) {
    return <Spinner />;
  }
  if(!ok){
    return <Navigate to ="/" />
  }

    return <Outlet />;
}
