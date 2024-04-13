import axios from 'axios';
import { createContext, useContext, useEffect, useState } from "react";
import { SERVER_URL } from '../utils';

const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [userInfo, setUserInfo] = useState({});
    // console.log(userInfo);

    useEffect(() => {
        let ignore = false;
        axios.get(`${SERVER_URL}/api/auth/identity`, { withCredentials: true })
            .then(response => {
                if (!ignore) {
                    // console.log(response.data);
                    setUserInfo(response.data);
                }
            })
            .catch(e => {
                console.log(e.response?.data?.error);
            });

        return () => ignore = true;
    }, [])

    const resetUserInfo = () => {
        axios.get(`${SERVER_URL}/api/auth/identity`, { withCredentials: true })
            .then(response => {
                    setUserInfo(response.data);
            })
            .catch(e => {
                console.log(e.response?.data?.error);
            });
    }
    return (
        <UserContext.Provider value={{ userInfo, setUserInfo, resetUserInfo }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserInfo = () => {
    const user = useContext(UserContext);

    if (!user) {
        throw new Error("useUserInfo must be used within an UserContextProvider");
    }
    return user;
}