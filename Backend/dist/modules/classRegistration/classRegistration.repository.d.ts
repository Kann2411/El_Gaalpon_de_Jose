import { DataSource, Repository } from 'typeorm';
import { Class } from '../classes/classes.entity';
import { ClassRegistration } from '../classes/classesRegistration.entity';
import { User } from '../users/users.entity';
export declare class classRegistrationRepository {
    private readonly userDBRepository;
    private readonly classesRepository;
    private readonly classRegistrationRepository;
    private dataSource;
    constructor(userDBRepository: Repository<User>, classesRepository: Repository<Class>, classRegistrationRepository: Repository<ClassRegistration>, dataSource: DataSource);
    getRegistrationUser(classId: any): Promise<Class>;
    getClassesForUser(userId: any): Promise<Class[]>;
    registerUserToClass(classId: any, userId: any): Promise<{
        message: string;
    }>;
    deleteRegisterUserFromClass(classId: any, userId: any): Promise<void>;
}
