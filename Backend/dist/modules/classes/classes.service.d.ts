import { UUID } from 'crypto';
import { Class } from './classes.entity';
import { ClassRepository } from './classes.repository';
import { CreateClassDto } from 'src/dtos/createClass.dto';
export declare class ClassService {
    private readonly classesRepository;
    constructor(classesRepository: ClassRepository);
    getClasses(): Promise<Class[]>;
    classesSeeder(): Promise<{
        message: string;
    }>;
    getClassById(id: UUID): Promise<Class>;
    createClass(classData: CreateClassDto): Promise<Class>;
    updateClass(id: UUID, classData: Class): Promise<Class>;
    deleteClass(id: UUID): Promise<string>;
}
