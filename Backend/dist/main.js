"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const middleware_rutas_1 = require("./middlewares/middleware.rutas");
const swagger_1 = require("@nestjs/swagger");
const omit_password_interceptor_1 = require("./interceptors/omit-password.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://localhost:3001', 'https://el-gaalpon-de-jose.onrender.com'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalInterceptors(new omit_password_interceptor_1.ExcludePasswordInterceptor());
    app.use(middleware_rutas_1.rutasMiddleware);
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Gimnasio')
        .setDescription('API para el gimnasio')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map