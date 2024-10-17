export interface IRegister {
    name: string,
    email: string,
    phone: string,
    dni: string,
    password: string,
    confirmPassword: string
}

export interface ILogin {
    email: string,
    password: string
}
export interface IProviderLogin {
    provider: 'google'; 
}


export type SignInCredential = ILogin | IProviderLogin;

export interface IUser {
    id: string; // ID del usuario, obligatorio
    name: string; // Nombre del usuario
    email: string; // Correo electrónico del usuario
    phone: string; // Número de teléfono del usuario
    dni: string; // DNI del usuario
    imgUrl?: string; // URL de la imagen del usuario (por defecto "default-image-url")
    registrationMethod?: string; // Método de registro (ejemplo: "Form")
    password: string; // Contraseña, opcional para evitar que se envíe en algunas situaciones
    confirmPassword: string; // Confirma la contraseña, opcional
  }

export interface IUserResponse {
    user: Partial<IUser> | null
    token: string
}

export interface IUserContext{
    user: Partial<IUser> | null
    setUser: React.Dispatch<React.SetStateAction<Partial<IUser> | null>>
    isLogged: boolean
    setIsLogged: (isLogged: boolean) => void
    signIn: (credential : ILogin) => Promise<boolean>
    signUp: (user: Omit<IUser, "id">) => Promise<boolean>
    logOut: () => void
}