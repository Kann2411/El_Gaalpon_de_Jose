"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeaturiesDTO = void 0;
const openapi = require("@nestjs/swagger");
class FeaturiesDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, value: { required: true, type: () => Boolean }, membresia: { required: true, type: () => require("../modules/membresia/membresia.entity").Membresia } };
    }
}
exports.FeaturiesDTO = FeaturiesDTO;
//# sourceMappingURL=features.dto.js.map