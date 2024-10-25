"use client";

import { DecodedToken, IUser, IUserContext, IUserResponse, SignInCredential } from "@/interfaces/interfaces";
import { postSignIn, postSignUp } from "@/lib/server/fetchUsers";
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation';
import { Session } from "next-auth";
import { useSession, signOut } from "next-auth/react";

export const UserContext = createContext<IUserContext>({
    user: null,
    setUser: () => {},
    isLogged: false,
    setIsLogged: () => {},
    signIn: async () => false,
    signUp: async (user: Omit<IUser, "id">) => ({ success: false, errorMessage: '' }),
    logOut: () => {},
    imgUrl: null,
    setImgUrl: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<Partial<IUser> | null>(null);
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const router = useRouter();
    const { data: session, status } = useSession();
    console.log("🚀 ~ UserProvider ~ status:", status);
    console.log("🚀 ~ UserProvider ~ session:", session);

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            const { name, email, image, role, id } = session.user as IUser;

            if (isLogged) return;

            setUser({ name, email, imgUrl: image, role, id });
            setIsLogged(true);
            setImgUrl(image || null);

            // Redirigir basado en el rol
            if (role === "admin") {
                router.push("/users");
            } else if (role === "coach") {
                router.push("/training-management");
            } else {
                router.push("/");
            }
        }
    }, [session, router, isLogged]);

    const signIn = async (credentials: SignInCredential): Promise<boolean> => {
        try {
            let data: IUserResponse | null;

            if ('provider' in credentials) {
                // La autenticación de Google ya está manejada por NextAuth
                return true;
            } else {
                const userResponse = await postSignIn(credentials);
                if (userResponse) {
                    data = { user: userResponse.user, token: userResponse.token };
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
                    id: decodedToken.id,
                    token: data.token,
                };

                setUser(userWithRole);
                localStorage.setItem('user', JSON.stringify(userWithRole));
                localStorage.setItem('token', data.token);
                setIsLogged(true);
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

    const signUp = async (user: Omit<IUser, "id">): Promise<{ success: boolean; errorMessage?: string }> => {
        try {
            console.log("Llamando a postSignUp con:", user);
            const data = await postSignUp(user);
            console.log("Respuesta recibida en signUp:", data);

            if (data && data.user && data.user.id) {
                console.log("Usuario registrado correctamente:", data.user);
                await signIn({ email: user.email, password: user.password });
                setImgUrl(data.user.imgUrl);
                return { success: true };
            } else {
                console.log("La respuesta no contiene el usuario o el ID:", data);
                return { success: false, errorMessage: "No se pudo obtener el ID del usuario." };
            }
        } catch (error) {
            console.error("Error en signUp:", error);
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido en el registro';
            return { success: false, errorMessage };
        }
    };

    const logOut = async () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        await signOut({ redirect: false });

        Swal.fire({
            title: 'Come back soon!',
            text: "You are logged out!",
            icon: 'success',
            confirmButtonText: 'Great',
            customClass: {
                popup: 'bg-black text-white',
                title: 'text-red-600',
                confirmButton: 'bg-red-600 text-white hover:bg-red-700 py-2 px-4 border-none rounded-md',
            },
            buttonsStyling: false,
        });

        setUser(null);
        setIsLogged(false);
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        const storedImgUrl = localStorage.getItem("imgUrl"); // Recuperar imgUrl del localStorage

        if (storedUser && token) {
            const parsedUser = JSON.parse(storedUser);

            if (token) {
                try {
                    const decodedToken: DecodedToken = jwtDecode(token);
                    const role = decodedToken.roles;

                    setUser({
                        ...parsedUser,
                        role: role,
                        id: decodedToken.id,
                    });
                    setImgUrl(storedImgUrl || ''); // Establecer imgUrl desde el localStorage
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
            value={{ user, setUser, isLogged, setIsLogged, signIn, signUp, logOut, imgUrl, setImgUrl }}
        >
            {children}
        </UserContext.Provider>
    );
};
