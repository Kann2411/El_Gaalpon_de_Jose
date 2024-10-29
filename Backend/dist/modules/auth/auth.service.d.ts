import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { SetPasswordDto } from 'src/dtos/setPassword.dto';
import { User } from 'src/modules/users/users.entity';
import { UsersRepository } from 'src/modules/users/users.repository';
export declare class AuthService {
    private readonly usersRepository;
    private readonly jwtService;
    private readonly mailerService;
    constructor(usersRepository: UsersRepository, jwtService: JwtService, mailerService: MailerService);
    validateOAuthLogin(profile: any): Promise<{
        token: string;
    }>;
    signUp(signUpDto: CreateUserDto): Promise<Omit<User, 'role'>>;
    signIn(email: string, password: string): Promise<{
        message: string;
        token: string;
    }>;
    sendPasswordResetEmail(email: string): Promise<string>;
    resetPassword(token: string, setPasswordDto: SetPasswordDto): Promise<string>;
}
