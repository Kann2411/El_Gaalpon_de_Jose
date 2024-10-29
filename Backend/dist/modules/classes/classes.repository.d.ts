import { Class } from './classes.entity';
import { UUID } from 'crypto';
import { DataSource, Repository } from 'typeorm';
import { CreateClassDto } from 'src/dtos/createClass.dto';
export declare class ClassRepository {
    private readonly classesRepository;
    private dataSource;
    constructor(classesRepository: Repository<Class>, dataSource: DataSource);
    getClasses(): Promise<Class[]>;
    classesSeeder(): Promise<{
        message: string;
    }>;
    getClassById(id: UUID): Promise<Class>;
    createClass(classData: CreateClassDto): Promise<Class>;
    updateClass(id: UUID, classData: Class): Promise<Class>;
    deleteClass(id: UUID): Promise<string>;
}
