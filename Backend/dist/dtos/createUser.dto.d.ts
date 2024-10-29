import { Role } from '../enums/role.enum';
import { RegistrationMethod } from 'src/enums/registrationMethod';
export declare class CreateUserDto {
    name: string;
    dni: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    role?: Role;
    registrationMethod?: RegistrationMethod;
    imgUrl?: string;
}
