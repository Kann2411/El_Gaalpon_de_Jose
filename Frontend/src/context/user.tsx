"use client";

import { DecodedToken, ILogin, IProviderLogin, IUser, IUserContext, IUserResponse, SignInCredential } from "@/interfaces/interfaces";
import { postSignIn, postSignUp } from "@/lib/server/fetchUsers";
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";



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
            let data: IUserResponse | null;
    
            if ('provider' in credentials) {
                console.log(`Iniciando sesión con ${credentials.provider}`);
                data = { user: { name: 'Google User', role: 'user' }, token: 'fake-google-token' }; 
            } else {
                const user = await postSignIn(credentials); 
                console.log("Datos devueltos de postSignIn:", user);
    
                if (user) {
                    data = { user, token: user.token };
                } else {
                    data = null;
                }
            }
    
            if (data && data.token) {
                const decodedToken: DecodedToken = jwtDecode(data.token);
                const role = decodedToken.roles; 
    
                const userWithRole = {
                    ...data.user,
                    role: role,
                };
    
                setUser(userWithRole);
                localStorage.setItem('user', JSON.stringify(userWithRole));
                localStorage.setItem('token', data.token);
                setIsLogged(true);
                console.log("Inicio de sesión exitoso con rol:", userWithRole);
                return true;
            }
    
            console.warn("No se pudo iniciar sesión, datos no válidos:", data);
            return false;
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error durante el login:', error.message);
            } else {
                console.error('Error inesperado durante el login:', error);
            }
            return false;
        }
    };
    
    

    const signUp = async (user: Omit<IUser, "id">): Promise<boolean> => {
        try {
            console.log("Llamando a postSignUp con:", user);
            const data = await postSignUp(user);
            console.log("Respuesta recibida en signUp:", data); 
    
            if (data && data.user && data.user.id ) {
                console.log("Usuario registrado correctamente:", data.user);
                await signIn({ email: user.email, password: user.password });
                return true;
            } else {
                console.log("La respuesta no contiene el usuario o el ID:", data);
                return false;
            }
        } catch (error) {
            console.error("Error en signUp:", error);
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
    
            if (token) {
                try {
                    const decodedToken: DecodedToken = jwtDecode(token);
                    const role = decodedToken.roles; 
    
                    setUser({
                        ...parsedUser,
                        role: role,
                    });
                    setIsLogged(true);
                } catch (error) {
                    console.warn("Error al decodificar el token:", error);
                }
            } else {
                console.warn("Token no encontrado o inválido");
            }
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
