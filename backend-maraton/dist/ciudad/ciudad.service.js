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
exports.CiudadService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const ciudad_entity_1 = require("./ciudad.entity");
let CiudadService = class CiudadService {
    ciudadModel;
    constructor(ciudadModel) {
        this.ciudadModel = ciudadModel;
    }
    async findAll() {
        return this.ciudadModel.find().exec();
    }
    async findOne(id) {
        if (!id || id.trim() === '') {
            throw new common_1.BadRequestException('ID es requerido');
        }
        const ciudad = await this.ciudadModel.findById(id).exec();
        if (!ciudad) {
            throw new common_1.NotFoundException(`Ciudad con ID: ${id} no encontrada`);
        }
        return ciudad;
    }
    async create(nombre) {
        const ciudadExistente = await this.ciudadModel.findOne({ nombre }).exec();
        if (ciudadExistente) {
            throw new common_1.BadRequestException('La ciudad ya existe');
        }
        const nuevaCiudad = new this.ciudadModel({ nombre });
        return nuevaCiudad.save();
    }
    async update(id, nombre) {
        const ciudadExistente = await this.ciudadModel.findOne({ nombre, _id: { $ne: id } }).exec();
        if (ciudadExistente) {
            throw new common_1.BadRequestException('La ciudad ya existe');
        }
        const result = await this.ciudadModel.findByIdAndUpdate(id, { nombre }, { new: true }).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Ciudad con ID ${id} no encontrada`);
        }
        return result;
    }
    async delete(id) {
        if (!id || id.trim() === '') {
            throw new common_1.BadRequestException('ID es requerido');
        }
        const ciudadEliminada = await this.ciudadModel.findByIdAndDelete(id).exec();
        if (!ciudadEliminada) {
            throw new common_1.NotFoundException(`Ciudad con ID ${id} no encontrada`);
        }
        return ciudadEliminada;
    }
};
exports.CiudadService = CiudadService;
exports.CiudadService = CiudadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(ciudad_entity_1.Ciudad.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CiudadService);
//# sourceMappingURL=ciudad.service.js.map