import { UsersRepository } from '../users/users.repository';
export declare class AuthRepository {
    private usersRepository;
    constructor(usersRepository: UsersRepository);
    signin(email: string, password: string): Promise<boolean>;
}
