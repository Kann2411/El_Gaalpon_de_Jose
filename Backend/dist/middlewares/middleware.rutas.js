"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rutasMiddleware = rutasMiddleware;
function rutasMiddleware(req, res, next) {
    const date = new Date();
    console.log(`Esta ejecutando un metodo ${req.method} en la ruta ${req.url}, fecha : ${date}`);
    next();
}
//# sourceMappingURL=middleware.rutas.js.map