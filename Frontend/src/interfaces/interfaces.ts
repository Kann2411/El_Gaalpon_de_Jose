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

export interface IUser {
    id: number,
    imgUrl?: string
    name: string,
    email: string,
    phone: string,
    dni: string,
    password: string
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