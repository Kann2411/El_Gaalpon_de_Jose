"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const chat_bot_module_1 = require("./modules/chat-bot/chat-bot.module");
const file_upload_module_1 = require("./modules/file-upload/file-upload.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("./config/typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const users_module_1 = require("./modules/users/users.module");
const auth_module_1 = require("./modules/auth/auth.module");
const training_module_1 = require("./modules/training/training.module");
const horario_module_1 = require("./modules/horario/horario.module");
const classes_module_1 = require("./modules/classes/classes.module");
const membresia_module_1 = require("./modules/membresia/membresia.module");
const mailer_1 = require("@nestjs-modules/mailer");
const mercadopago_module_1 = require("./modules/mercadopago/mercadopago.module");
const classRegistration_module_1 = require("./modules/classRegistration/classRegistration.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [typeorm_1.default],
            }),
            typeorm_2.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => configService.get('typeorm'),
            }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASSWORD,
                    },
                },
                defaults: {
                    from: '"No Reply" <noreply@.com>',
                },
            }),
            chat_bot_module_1.ChatBotModule,
            file_upload_module_1.FileUploadModule,
            horario_module_1.HorarioModule,
            classes_module_1.ClassesModule,
            classRegistration_module_1.ClassRegistrationModule,
            membresia_module_1.MembresiaModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            training_module_1.TrainingModule,
            mercadopago_module_1.MercadoPagoModule,
            jwt_1.JwtModule.register({
                global: true,
                signOptions: { expiresIn: '1h' },
                secret: process.env.JWT_SECRET,
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map