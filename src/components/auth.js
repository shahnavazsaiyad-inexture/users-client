import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({children}) => {


    let loggedInUser = null;    
    if(localStorage.getItem("userId")){
        loggedInUser = {
            username: localStorage.getItem("username"),
            role: localStorage.getItem("role"),
            jwtToken: localStorage.getItem("jwtToken"),
            userId: localStorage.getItem("userId")
        };
    }
    const [user, setUser] = useState(loggedInUser)




    const login = (user) => {
        setUser(user);
        localStorage.setItem("username", user.username);
        localStorage.setItem("role", user.role);
        localStorage.setItem("jwtToken", user.jwtToken);
        localStorage.setItem("userId", user.userId);
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userId");
        
    }

    const isLoggedIn = () => {
        return (user && user.jwtToken && user.userId && user.role && localStorage.getItem("userId"))  
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