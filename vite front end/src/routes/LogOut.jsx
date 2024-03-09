import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// const access_token = localStorage.getItem('access_token');
// const response = await fetch(url, {
//     method:'GET',

// })


export const LogOut = () => {
    const navigate = useNavigate();
    const {setIsAuth} = useAuth();

    useEffect(() => {
        localStorage.clear()
        setIsAuth(false);
        return navigate('/login')
    }, [navigate, setIsAuth])

}

export default LogOut