import { ClassRegistrationService } from './classRegistration.service';
export declare class ClassRegistrationController {
    private readonly classRegistrationService;
    constructor(classRegistrationService: ClassRegistrationService);
    getRegistrationUser(classId: string): Promise<import("../classes/classes.entity").Class>;
    getClassesForUser(userId: string): Promise<import("../classes/classes.entity").Class[]>;
    registerUserToClass(classId: string, userId: string): Promise<{
        message: string;
    }>;
    deleteRegisterUserFromClass(classId: string, userId: string): Promise<void>;
}
