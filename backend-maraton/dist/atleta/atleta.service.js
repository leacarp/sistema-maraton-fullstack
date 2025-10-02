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
exports.AtletaService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const atleta_entity_1 = require("./atleta.entity");
const ciudad_entity_1 = require("../ciudad/ciudad.entity");
let AtletaService = class AtletaService {
    atletaModel;
    ciudadModel;
    constructor(atletaModel, ciudadModel) {
        this.atletaModel = atletaModel;
        this.ciudadModel = ciudadModel;
    }
    async findAll() {
        return this.atletaModel.find().populate('ciudadId', 'nombre').sort({ posicion: 1 }).exec();
    }
    async findOne(id) {
        if (!id || id.trim() === '') {
            throw new common_1.BadRequestException('ID es requerido');
        }
        const atleta = await this.atletaModel.findById(id).populate('ciudadId', 'nombre').exec();
        if (!atleta) {
            throw new common_1.NotFoundException(`Atleta con ID: ${id} no encontrado`);
        }
        return atleta;
    }
    async create(atletaDto) {
        const dniAtletaExistente = await this.atletaModel.findOne({ dni: atletaDto.dni }).exec();
        if (dniAtletaExistente) {
            throw new common_1.BadRequestException('El atleta con ese DNI ya existe');
        }
        const ciudadExistente = await this.ciudadModel.findById(atletaDto.ciudadId).exec();
        if (!ciudadExistente) {
            throw new common_1.NotFoundException(`Ciudad con ID: ${atletaDto.ciudadId} no encontrada`);
        }
        const nuevoAtleta = new this.atletaModel(atletaDto);
        return nuevoAtleta.save();
    }
    async update(id, atletaDto) {
        const dniAtletaExistente = await this.atletaModel.findOne({ dni: atletaDto.dni, _id: { $ne: id } }).exec();
        if (dniAtletaExistente) {
            throw new common_1.BadRequestException('El atleta con ese DNI ya existe');
        }
        const ciudadExistente = await this.ciudadModel.findById(atletaDto.ciudadId).exec();
        if (!ciudadExistente) {
            throw new common_1.NotFoundException(`Ciudad con ID: ${atletaDto.ciudadId} no encontrada`);
        }
        const result = await this.atletaModel.findByIdAndUpdate(id, atletaDto, { new: true }).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Atleta con ID ${id} no encontrado`);
        }
        return result;
    }
    async delete(id) {
        if (!id || id.trim() === '') {
            throw new common_1.BadRequestException('ID es requerido');
        }
        const atletaEliminado = await this.atletaModel.findByIdAndDelete(id).exec();
        if (!atletaEliminado) {
            throw new common_1.NotFoundException(`Atleta con ID ${id} no encontrado`);
        }
        return atletaEliminado;
    }
};
exports.AtletaService = AtletaService;
exports.AtletaService = AtletaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(atleta_entity_1.Atleta.name)),
    __param(1, (0, mongoose_1.InjectModel)(ciudad_entity_1.Ciudad.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, mongoose_2.Model])
], AtletaService);
//# sourceMappingURL=atleta.service.js.map