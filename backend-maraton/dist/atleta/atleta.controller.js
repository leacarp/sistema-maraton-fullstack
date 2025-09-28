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
exports.AtletaController = void 0;
const common_1 = require("@nestjs/common");
const atleta_service_1 = require("./atleta.service");
const atleta_dto_1 = require("./dtos/atleta.dto");
let AtletaController = class AtletaController {
    atletaService;
    constructor(atletaService) {
        this.atletaService = atletaService;
    }
    async findAll() {
        const atletas = await this.atletaService.findAll();
        return atletas.map(atleta => ({
            id: atleta.id,
            dni: atleta.dni,
            nombre: atleta.nombre,
            tiempo: atleta.tiempo,
            posicion: atleta.posicion,
            ciudad: atleta.ciudadId?.nombre || '',
        }));
    }
    async findOne(id) {
        try {
            const atleta = await this.atletaService.findOne(id);
            return {
                id: atleta.id,
                dni: atleta.dni,
                nombre: atleta.nombre,
                tiempo: atleta.tiempo,
                posicion: atleta.posicion,
                ciudad: atleta.ciudadId?.nombre || '',
            };
        }
        catch (error) {
            throw error;
        }
    }
    async create(atletaDto) {
        try {
            const atleta = await this.atletaService.create(atletaDto);
            const atletaConCiudad = await this.atletaService.findOne(atleta.id);
            return {
                id: atletaConCiudad.id,
                dni: atletaConCiudad.dni,
                nombre: atletaConCiudad.nombre,
                tiempo: atletaConCiudad.tiempo,
                posicion: atletaConCiudad.posicion,
                ciudad: atletaConCiudad.ciudadId?.nombre || '',
            };
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, atletaDto) {
        try {
            const atleta = await this.atletaService.update(id, atletaDto);
            const atletaConCiudad = await this.atletaService.findOne(atleta.id);
            return {
                id: atletaConCiudad.id,
                dni: atletaConCiudad.dni,
                nombre: atletaConCiudad.nombre,
                tiempo: atletaConCiudad.tiempo,
                posicion: atletaConCiudad.posicion,
                ciudad: atletaConCiudad.ciudadId?.nombre || '',
            };
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const atleta = await this.atletaService.delete(id);
            return {
                id: atleta.id,
                dni: atleta.dni,
                nombre: atleta.nombre,
                tiempo: atleta.tiempo,
                posicion: atleta.posicion,
                ciudad: atleta.ciudadId?.nombre || '',
            };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.AtletaController = AtletaController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AtletaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AtletaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [atleta_dto_1.AtletaDto]),
    __metadata("design:returntype", Promise)
], AtletaController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, atleta_dto_1.AtletaDto]),
    __metadata("design:returntype", Promise)
], AtletaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AtletaController.prototype, "delete", null);
exports.AtletaController = AtletaController = __decorate([
    (0, common_1.Controller)('atletas'),
    __metadata("design:paramtypes", [atleta_service_1.AtletaService])
], AtletaController);
//# sourceMappingURL=atleta.controller.js.map