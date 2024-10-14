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