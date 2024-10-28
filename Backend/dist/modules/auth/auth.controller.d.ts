import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { LoginUserDto } from 'src/dtos/loginUser.dto';
import { SetPasswordDto } from 'src/dtos/setPassword.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleAuth(req: any): Promise<void>;
    googleLoginCallback(req: any, res: any): Promise<any>;
    signUp(signUpDto: CreateUserDto): Promise<{
        user: {
            trainings: import("../training/training.entity").Training[];
            name: string;
            id: string;
            registrations: import("../classes/classesRegistration.entity").ClassRegistration[];
            dni: string;
            email: string;
            phone: string;
            imgUrl: string;
            registrationMethod: import("../../enums/registrationMethod").RegistrationMethod;
            isBanned: boolean;
            trainingPlans: import("../training/trainingPlan.entity").TrainingPlan[];
        };
    }>;
    signIn(credentials: LoginUserDto): Promise<{
        message: string;
        token: string;
    }>;
    forgotPassword(email: string): Promise<string>;
    resetPassword(token: string, setPasswordDto: SetPasswordDto): Promise<string>;
}
