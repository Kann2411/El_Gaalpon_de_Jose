import { classRegistrationRepository } from './classRegistration.repository';
export declare class ClassRegistrationService {
    private readonly classRepository;
    constructor(classRepository: classRegistrationRepository);
    getRegistrationUser(classId: any): Promise<import("../classes/classes.entity").Class>;
    getClassesForUser(userId: string): Promise<import("../classes/classes.entity").Class[]>;
    registerUserToClass(classId: string, userId: string): Promise<{
        message: string;
    }>;
    deleteRegisterUserFromClass(classId: string, userId: string): Promise<void>;
}
