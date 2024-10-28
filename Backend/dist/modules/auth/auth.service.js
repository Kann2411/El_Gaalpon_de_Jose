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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const registrationMethod_1 = require("../../enums/registrationMethod");
const role_enum_1 = require("../../enums/role.enum");
const users_repository_1 = require("../users/users.repository");
let AuthService = class AuthService {
    constructor(usersRepository, jwtService, mailerService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
    }
    async validateOAuthLogin(profile) {
        console.log('Hola, se ejecuto validateOuthLogin');
        if (profile?.token) {
            return { token: profile.token };
        }
        const email = profile?.emails?.[0]?.value || profile?.email || profile?._json?.email;
        if (!email) {
            throw new Error('No se pudo obtener un correo electrónico del perfil.');
        }
        const name = profile.displayName ||
            `${profile?.name?.givenName || ''} ${profile?.name?.familyName || ''}` ||
            'Sin Nombre';
        const imgUrl = profile?._json?.picture;
        let user = await this.usersRepository.findByEmail(email);
        if (!user) {
            user = await this.usersRepository.createUser({
                email,
                name,
                password: '',
                dni: '',
                phone: '',
                registrationMethod: registrationMethod_1.RegistrationMethod.Google,
                role: role_enum_1.Role.User,
                imgUrl,
                confirmPassword: '',
            });
        }
        if (user.isBanned) {
            throw new common_1.BadRequestException('Tu cuenta ha sido baneada.');
        }
        const payload = { id: user.id, email: user.email, role: user.role };
        const token = this.jwtService.sign(payload);
        return { token };
    }
    async signUp(signUpDto) {
        console.log('Hola, se ejecuto la funcion signUp');
        const { email, password } = signUpDto;
        const existingUser = await this.usersRepository.findByEmail(email);
        if (existingUser) {
            throw new common_1.BadRequestException('El correo electrónico ya está en uso.');
        }
        const newUserDto = {
            ...signUpDto,
            password,
        };
        const newUser = await this.usersRepository.createUser(newUserDto);
        const { role, ...userWithoutRole } = newUser;
        return userWithoutRole;
    }
    async signIn(email, password) {
        console.log('Se ejecuto el metodo Signin');
        if (!email || !password) {
            throw new common_1.BadRequestException('Email  y contraseña son requeridos.');
        }
        const user = await this.usersRepository.findByEmail(email);
        if (!user)
            throw new common_1.BadRequestException('credenciales invalidas');
        if (user.isBanned) {
            throw new common_1.BadRequestException('Tu cuenta ha sido baneada.');
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword)
            throw new common_1.BadRequestException('credenciales invalidas');
        const payload = {
            id: user.id,
            email: user.email,
            roles: user.role,
        };
        const token = this.jwtService.sign(payload);
        return {
            message: 'login exitosamente',
            token,
        };
    }
    async sendPasswordResetEmail(email) {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        const token = this.jwtService.sign({ id: user.id }, { expiresIn: '1h' });
        console.log(`Generated reset token: ${token}`);
        const resetLink = `http://localhost:3001/auth/reset-password?token=${token}`;
        const htmlContent = `
      <h1>Restablecimiento de contraseña</h1>
      <p>Hola, ${user.name}!</p>
      <p>Hiciste una solicitud para restablecer tu contraseña. Haz clic en el enlace a continuación para restablecerla:</p>
      <a href="${resetLink}">Restablecer contraseña</a>
      <p>Si no solicitaste este cambio, ignora este correo.</p>
    `;
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Restablecimiento de contraseña',
            html: htmlContent,
        });
        return 'Correo de recuperación enviado con éxito';
    }
    resetPassword(token, setPasswordDto) {
        return this.usersRepository.resetPassword(token, setPasswordDto);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        jwt_1.JwtService,
        mailer_1.MailerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map