import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {loginUser, registerAccount} from "../services/AuthenticationService";
import axios from "axios";

export const AuthContext = createContext({
    user: {firstName: '', lastName: ''},
    login: (email, password) => {
    },
    register: (firstName, lastName, industry, email, password, agreement,selectedRole) => {
    }
})

function AuthContextProvider(props) {

    const[token,setToken] = useState("");

    const [user, setUser] = useState(token ? _parseUserFromJwt(token) : null);

    const navigate = useNavigate();

    useEffect(() => {
        setToken(localStorage.getItem("jwttoken"))
    },[]);

    const login = (email, password) => {
        loginUser(email, password)
            .then((res) => {
                console.log("CO TUTAJ JEST ", res.data);
                localStorage.setItem('jwttoken', res.data);
                setUser(_parseUserFromJwt(res.data))
                navigate('/home');
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const register = (firstName, lastName, industry, email, password, agreement,selectedRole) => {
        registerAccount(firstName, lastName, industry, email, password, agreement,selectedRole)
            .then((res) => {
                localStorage.setItem('jwttoken', res.data.body.jwttoken);
                setUser(_parseUserFromJwt(res.data.body.jwttoken))
                navigate('/login');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const logout = () => {
        localStorage.removeItem('jwttoken');
        setUser(null);
    }

    const value = {user: user, login: login, register: register, logout: logout}

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(response => {
            return response;
        }, error => {
            if (error.response.status === 401) {
                //TODO: in future try to use here refresh token and resend previous request
                logout();
            }
            return error;
        });

        return () => {
            axios.interceptors.response.eject(interceptor);
        }
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}

const _parseUserFromJwt = (token) => {
    if (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+')?.replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('')
            .map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        const payload = JSON.parse(jsonPayload);
        return {
            firstName: payload.sub,
            lastName: ''
        };
    }
    return null;
}


export default AuthContextProvider;