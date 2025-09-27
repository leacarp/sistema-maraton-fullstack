"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CiudadModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const ciudad_entity_1 = require("./ciudad.entity");
const ciudad_controller_1 = require("./ciudad.controller");
const ciudad_service_1 = require("./ciudad.service");
let CiudadModule = class CiudadModule {
};
exports.CiudadModule = CiudadModule;
exports.CiudadModule = CiudadModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: ciudad_entity_1.Ciudad.name, schema: ciudad_entity_1.CiudadSchema }]),
        ],
        controllers: [ciudad_controller_1.CiudadController],
        providers: [ciudad_service_1.CiudadService],
    })
], CiudadModule);
//# sourceMappingURL=ciudad.module.js.map