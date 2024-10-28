import { User } from '../users/users.entity';
export declare class TrainingPlan {
    id: string;
    description: string;
    file: string;
    coach: User;
    downloadPlan(): void;
}
