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
exports.AtletaSchema = exports.Atleta = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Atleta = class Atleta extends mongoose_2.Document {
    dni;
    nombre;
    tiempo;
    posicion;
    ciudadId;
};
exports.Atleta = Atleta;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", Number)
], Atleta.prototype, "dni", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, minlength: 2 }),
    __metadata("design:type", String)
], Atleta.prototype, "nombre", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Atleta.prototype, "tiempo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Atleta.prototype, "posicion", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Ciudad', required: true }),
    __metadata("design:type", String)
], Atleta.prototype, "ciudadId", void 0);
exports.Atleta = Atleta = __decorate([
    (0, mongoose_1.Schema)()
], Atleta);
exports.AtletaSchema = mongoose_1.SchemaFactory.createForClass(Atleta);
//# sourceMappingURL=atleta.entity.js.map