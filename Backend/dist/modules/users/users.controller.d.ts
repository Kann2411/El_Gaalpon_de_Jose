import { UsersService } from './users.service';
import { UpdateProfileDto } from 'src/dtos/updateProfile.dto';
import { ChangePasswordDto } from 'src/dtos/changePassword.dto';
import { SetPasswordDto } from 'src/dtos/setPassword.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<import("./users.entity").User[]>;
    getUserByIdImag(id: string): Promise<string>;
    getUserById(id: string): Promise<import("./users.entity").User>;
    updateProfile(id: string, updateProfileDto: UpdateProfileDto): Promise<import("./users.entity").User>;
    changePassword(id: string, changePasswordDto: ChangePasswordDto): Promise<string>;
    setPassword(id: string, setPasswordDto: SetPasswordDto): Promise<string>;
    patchUser(id: string, role: string): Promise<{
        message: string;
    }>;
    banUser(id: string, isBanned: boolean): Promise<import("./users.entity").User>;
}
