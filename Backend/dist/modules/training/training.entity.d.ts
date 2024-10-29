import { User } from '../users/users.entity';
export declare class Training {
    id: string;
    date: string;
    duration: string;
    progress: string;
    user: User;
    registerProgress(newProgress: string): void;
}
