"use client";

import { ILogin, IProviderLogin, IUser, IUserContext, IUserResponse, SignInCredential } from "@/interfaces/interfaces";
import { postSignIn, postSignUp } from "@/lib/server/fetchUsers";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<IUserContext>({
    user: null,
    setUser: () => {},
    isLogged: false,
    setIsLogged: () => {},
    signIn: async () => false,
    signUp: async () => false,
    logOut: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<Partial<IUser> | null>(null);
    const [isLogged, setIsLogged] = useState<boolean>(false);

    const signIn = async (credentials: SignInCredential): Promise<boolean> => {
        try {
            let data: IUserResponse;
    
            if ('provider' in credentials) {
                console.log(`Iniciando sesión con ${credentials.provider}`);
                data = { user: { name: 'Google User' }, token: 'fake-google-token' }; // Simulación
            } else {
                data = await postSignIn(credentials);
            }
    
            if (data && data.user) {
                setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.token);
                setIsLogged(true);
                return true;
            }
    
            return false;
        } catch (error) {
            console.error('Error durante el login:', error);
            return false;
        }
    };
    

    const signUp = async (user: Omit<IUser, "id">): Promise<boolean> => {
        try {
            const data = await postSignUp(user);
            console.log("data:", data);
            if (data && data.user.id && data.user.id) { 
                await signIn({ email: user.email, password: user.password });
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    };
    

    const logOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setIsLogged(false);
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (storedUser && token) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsLogged(true);
        }
    }, []);

    return (
        <UserContext.Provider
            value={{ user, setUser, isLogged, setIsLogged, signIn, signUp, logOut }}
        >
            {children}
        </UserContext.Provider>
    );
};
