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
    id: string; 
    name: string; 
    email: string; 
    phone: string; 
    dni: string;
    imgUrl?: string;
    registrationMethod?: string; 
    password: string;
    confirmPassword: string;
    role?: string | 'admin' | 'user' | 'coach'; 
    token?: string;

  }

export interface IUserResponse {
    user: Partial<IUser> | null
    token: string
    imgUrl?: string
}

export interface IUserContext{
    user: Partial<IUser> | null
    setUser: React.Dispatch<React.SetStateAction<Partial<IUser> | null>>
    isLogged: boolean
    setIsLogged: (isLogged: boolean) => void
    signIn: (credential: ILogin) => Promise<boolean>;

    // Actualizar el tipo de signUp
    signUp: (user: Omit<IUser, "id">) => Promise<{ success: boolean; errorMessage?: string }>;

    logOut: () => void
    imgUrl: string | null
    setImgUrl: React.Dispatch<React.SetStateAction<string | null>>
}



export interface IButtonProps {
    content: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; 
    redirectTo?: string;
}

export interface DecodedToken {
    id: string;
    email: string;
    roles: string;
    iat: number;
    exp: number;
}


export interface FormValues {
    name: string;
    username: string;
    phone: string;
    email: string;
    message: string;
  }