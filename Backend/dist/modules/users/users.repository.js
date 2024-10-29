"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("./users.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const role_enum_1 = require("../../enums/role.enum");
const jwt_1 = require("@nestjs/jwt");
let UsersRepository = class UsersRepository {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async getUsers() {
        try {
            const [users] = await this.userRepository.findAndCount({
                select: ['id', 'name', 'dni', 'email', 'phone', 'role'],
            });
            return users;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error al obtener los usuarios');
        }
    }
    async getUserByIdImag(id) {
        try {
            const user = await this.userRepository.findOne({
                where: { id },
                select: {
                    imgUrl: true,
                },
            });
            if (!user) {
                throw new common_1.NotFoundException(`Usuario con id ${id} no existe`);
            }
            return user.imgUrl;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error al obtener el usuario por ID');
        }
    }
    async getUserById(id) {
        try {
            const user = await this.userRepository.findOne({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    dni: true,
                    email: true,
                    phone: true,
                    registrationMethod: true,
                },
            });
            if (!user) {
                throw new common_1.NotFoundException(`Usuario con id ${id} no existe`);
            }
            return user;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error al obtener el usuario por ID');
        }
    }
    async patchUser(id, role) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new common_1.NotFoundException(`Usuario con nombre ${id} no existe`);
        }
        if (role === 'admin') {
            user.role = role_enum_1.Role.Admin;
        }
        if (role === 'coach') {
            user.role = role_enum_1.Role.Coach;
        }
        if (role === 'user') {
            user.role = role_enum_1.Role.User;
        }
        await this.userRepository.save(user);
        return { message: `Rol de ${user.name} cambiado a ${user.role}` };
    }
    async findByEmail(email) {
        return this.userRepository.findOne({ where: { email } });
    }
    async updateUserImage(id, secureUrl) {
        try {
            const user = await this.userRepository.findOne({
                where: { id: id },
            });
            if (!user) {
                throw new common_1.NotFoundException(`Usuario con id ${id} no existe.`);
            }
            user.imgUrl = secureUrl;
            await this.userRepository.save(user);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error al actualizar la imagen del producto.');
        }
    }
    async createUser(createUserDto) {
        try {
            const newUser = this.userRepository.create(createUserDto);
            if (createUserDto.password) {
                newUser.password = await bcrypt.hash(createUserDto.password, 10);
            }
            await this.userRepository.save(newUser);
            return newUser;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error al crear el usuario');
        }
    }
    async updateProfile(id, updateProfileDto) {
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            if (!user) {
                throw new common_1.NotFoundException(`Usuario con id ${id} no existe`);
            }
            this.userRepository.merge(user, updateProfileDto);
            await this.userRepository.save(user);
            return user;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error al actualizar el perfil');
        }
    }
    async changePassword(id, changePasswordDto) {
        try {
            const { currentPassword, newPassword, confirmPassword } = changePasswordDto;
            const user = await this.userRepository.findOne({ where: { id } });
            if (!user) {
                throw new common_1.NotFoundException(`Usuario con id ${id} no existe`);
            }
            const passwordMatches = await bcrypt.compare(currentPassword, user.password);
            if (!passwordMatches) {
                throw new common_1.BadRequestException('La contraseña actual es incorrecta.');
            }
            if (newPassword !== confirmPassword) {
                throw new common_1.BadRequestException('La nueva contraseña y la confirmación no coinciden.');
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
            await this.userRepository.save(user);
            return 'Contraseña actualizada con éxito';
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error al cambiar la contraseña');
        }
    }
    async setPassword(id, setPasswordDto) {
        try {
            const { newPassword, confirmPassword } = setPasswordDto;
            const user = await this.userRepository.findOne({ where: { id } });
            if (!user) {
                throw new common_1.NotFoundException(`Usuario con id ${id} no existe`);
            }
            if (newPassword !== confirmPassword) {
                throw new common_1.BadRequestException('La nueva contraseña y la confirmación no coinciden.');
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
            await this.userRepository.save(user);
            return 'Contraseña establecida con éxito';
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error al establecer la contraseña');
        }
    }
    async deleteUser(id) {
        try {
            const result = await this.userRepository.delete(id);
            if (result.affected === 0) {
                throw new common_1.NotFoundException(`Usuario con id ${id} no existe`);
            }
            return id;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error al eliminar el usuario');
        }
    }
    async resetPassword(token, setPasswordDto) {
        try {
            const decoded = this.jwtService.verify(token);
            const user = await this.userRepository.findOne({
                where: { id: decoded.id },
            });
            if (!user) {
                throw new common_1.NotFoundException('Usuario no encontrado');
            }
            const { newPassword, confirmPassword } = setPasswordDto;
            if (newPassword !== confirmPassword) {
                throw new common_1.BadRequestException('Las contraseñas no coinciden.');
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
            await this.userRepository.save(user);
            return 'Contraseña restablecida con éxito';
        }
        catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new common_1.BadRequestException('El enlace ha expirado. Solicita uno nuevo.');
            }
            throw new common_1.BadRequestException('El enlace no es válido.');
        }
    }
    async toggleBanUser(id, isBanned) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        user.isBanned = isBanned;
        return this.userRepository.save(user);
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map