import { ClassRepository } from './classes.repository';
export declare class ClassesModule {
    private readonly classRepository;
    constructor(classRepository: ClassRepository);
    onModuleInit(): Promise<void>;
}
