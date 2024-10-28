import { UUID } from 'crypto';
import { Class } from './classes.entity';
import { ClassService } from './classes.service';
import { CreateClassDto } from 'src/dtos/createClass.dto';
export declare class ClassesController {
    private readonly classesService;
    constructor(classesService: ClassService);
    getClasses(): Promise<Class[]>;
    getClassesSeeder(): Promise<{
        message: string;
    }>;
    getClassById(id: UUID): Promise<Class>;
    createClass(classData: CreateClassDto): Promise<Class>;
    updateClass(id: UUID, classData: Class): Promise<Class>;
    deleteClass(id: UUID): Promise<string>;
}
