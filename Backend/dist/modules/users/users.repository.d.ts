import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../dtos/createUser.dto';
import { UpdateProfileDto } from 'src/dtos/updateProfile.dto';
import { ChangePasswordDto } from 'src/dtos/changePassword.dto';
import { SetPasswordDto } from 'src/dtos/setPassword.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UsersRepository {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    getUsers(): Promise<User[]>;
    getUserByIdImag(id: string): Promise<string>;
    getUserById(id: string): Promise<User>;
    patchUser(id: any, role: any): Promise<{
        message: string;
    }>;
    findByEmail(email: string): Promise<User | null>;
    updateUserImage(id: string, secureUrl: string): Promise<void>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateProfile(id: string, updateProfileDto: UpdateProfileDto): Promise<User>;
    changePassword(id: string, changePasswordDto: ChangePasswordDto): Promise<string>;
    setPassword(id: string, setPasswordDto: SetPasswordDto): Promise<string>;
    deleteUser(id: string): Promise<string>;
    resetPassword(token: string, setPasswordDto: SetPasswordDto): Promise<string>;
    toggleBanUser(id: string, isBanned: boolean): Promise<User>;
}
