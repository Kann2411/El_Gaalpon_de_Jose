import { UsersRepository } from './users.repository';
import { UpdateProfileDto } from 'src/dtos/updateProfile.dto';
import { ChangePasswordDto } from 'src/dtos/changePassword.dto';
import { SetPasswordDto } from 'src/dtos/setPassword.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: UsersRepository);
    getUsers(): Promise<import("./users.entity").User[]>;
    getUserByIdImag(id: string): Promise<string>;
    getUserById(id: string): Promise<import("./users.entity").User>;
    patchUser(id: string, role: string): Promise<{
        message: string;
    }>;
    updateProfile(id: string, updateProfileDto: UpdateProfileDto): Promise<import("./users.entity").User>;
    changePassword(id: string, changePasswordDto: ChangePasswordDto): Promise<string>;
    setPassword(id: string, setPasswordDto: SetPasswordDto): Promise<string>;
    toggleUserBan(id: string, isBanned: boolean): Promise<import("./users.entity").User>;
}
