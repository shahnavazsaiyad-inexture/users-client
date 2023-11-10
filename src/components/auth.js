import { Cookie } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({children}) => {


    let loggedInUser = null;    
    if(localStorage.getItem("userId")){
        loggedInUser = {
            username: localStorage.getItem("username"),
            role: localStorage.getItem("role"),
            userId: localStorage.getItem("userId")
        };
    }
    const [user, setUser] = useState(loggedInUser)




    const login = (user) => {
        setUser(user);
        localStorage.setItem("username", user.username);
        localStorage.setItem("role", user.role);
        localStorage.setItem("userId", user.userId);
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");

        axios.get('http://localhost:8080/logout', {withCredentials: true})
                .then(response => console.log(response))
                .catch(e => console.log(e));
    }

    const isLoggedIn = () => {
        return (user && user.userId && user.role && localStorage.getItem("userId"))  
    }

    return (
        <AuthContext.Provider value={{user, login, logout, isLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )   
}

export const useAuth = () => {
    return useContext(AuthContext);
}