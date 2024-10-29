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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("./users.repository");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    getUsers() {
        return this.usersRepository.getUsers();
    }
    getUserByIdImag(id) {
        return this.usersRepository.getUserByIdImag(id);
    }
    getUserById(id) {
        return this.usersRepository.getUserById(id);
    }
    patchUser(id, role) {
        return this.usersRepository.patchUser(id, role);
    }
    updateProfile(id, updateProfileDto) {
        return this.usersRepository.updateProfile(id, updateProfileDto);
    }
    changePassword(id, changePasswordDto) {
        return this.usersRepository.changePassword(id, changePasswordDto);
    }
    setPassword(id, setPasswordDto) {
        return this.usersRepository.setPassword(id, setPasswordDto);
    }
    toggleUserBan(id, isBanned) {
        return this.usersRepository.toggleBanUser(id, isBanned);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], UsersService);
//# sourceMappingURL=users.service.js.map