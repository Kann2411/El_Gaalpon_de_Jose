export interface IRegister {
    name: string,
    email: string,
    phone: string,
    dni: string,
    password: string,
    confirmPassword: string,
}

export interface ILogin {
    email: string,
    password: string
}
export interface IProviderLogin {
    provider: 'google'; 
}

export interface IClassData {
    name: string;
    intensity: "low" | "medium" | "high";
    capacity: number;
    status: "Active" | "Inactive";
    description: string;
    duration: string;
    day: string;
    starttime: string;
    endtime: string;
    coach: string;
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
    isBanned?: boolean
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

  export interface IPlan {
    description: string;
    file: File | null;
  }

  export interface GymClass {
    name: string;
    intensity: string;
    capacity: number;
    status: string;
    // file: File | null;
    description: string;
    duration: string;
    day: string;
    starttime: string;
    endtime: string;
    coach: string;  
  }

  export interface ImageClass {
    id: string;
    file: string;
  }

  export interface FormValues {
    description: string;
    file: File | null;
}

export interface IRegistration {
    id: string;
    user: IUser
}

export interface IClassInfo {
    id: string;
    name: string;
    intensity: string;
    capacity: string;
    status: string;
    image: string;
    description: string;
    duration: string;
    day: string;
    starttime: string;
    endtime: string;
    registrations: IRegistration[]
}

export interface IUserListProps {
    users: IUser[];
    renderRoleButtons: (userRole: 'user' | 'admin' | 'coach', userId: string) => JSX.Element;
    changeUserRole: (userId: string, newRole: 'user' | 'admin' | 'coach') => void;
}

export default IUser;