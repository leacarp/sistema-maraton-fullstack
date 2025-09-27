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
exports.CiudadController = void 0;
const common_1 = require("@nestjs/common");
const ciudad_service_1 = require("./ciudad.service");
const ciudad_dto_1 = require("./dtos/ciudad.dto");
let CiudadController = class CiudadController {
    ciudadService;
    constructor(ciudadService) {
        this.ciudadService = ciudadService;
    }
    async findAll() {
        try {
            const ciudades = await this.ciudadService.findAll();
            return ciudades.map(ciudad => ({
                id: ciudad.id,
                nombre: ciudad.nombre,
            }));
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            const ciudad = await this.ciudadService.findOne(id);
            return {
                id: ciudad.id,
                nombre: ciudad.nombre,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async create(ciudadDto) {
        try {
            const ciudad = await this.ciudadService.create(ciudadDto.nombre);
            return {
                id: ciudad.id,
                nombre: ciudad.nombre,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, ciudadDto) {
        try {
            const ciudad = await this.ciudadService.update(id, ciudadDto.nombre);
            return {
                id: ciudad.id,
                nombre: ciudad.nombre,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const ciudad = await this.ciudadService.delete(id);
            return {
                id: ciudad.id,
                nombre: ciudad.nombre,
            };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.CiudadController = CiudadController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CiudadController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CiudadController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ciudad_dto_1.CiudadDto]),
    __metadata("design:returntype", Promise)
], CiudadController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ciudad_dto_1.CiudadDto]),
    __metadata("design:returntype", Promise)
], CiudadController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CiudadController.prototype, "delete", null);
exports.CiudadController = CiudadController = __decorate([
    (0, common_1.Controller)('ciudades'),
    __metadata("design:paramtypes", [ciudad_service_1.CiudadService])
], CiudadController);
//# sourceMappingURL=ciudad.controller.js.map