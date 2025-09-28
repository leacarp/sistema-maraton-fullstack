"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtletaModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const atleta_entity_1 = require("./atleta.entity");
const ciudad_entity_1 = require("../ciudad/ciudad.entity");
const atleta_controller_1 = require("./atleta.controller");
const atleta_service_1 = require("./atleta.service");
let AtletaModule = class AtletaModule {
};
exports.AtletaModule = AtletaModule;
exports.AtletaModule = AtletaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: atleta_entity_1.Atleta.name, schema: atleta_entity_1.AtletaSchema },
                { name: ciudad_entity_1.Ciudad.name, schema: ciudad_entity_1.CiudadSchema }
            ]),
        ],
        controllers: [atleta_controller_1.AtletaController],
        providers: [atleta_service_1.AtletaService],
        exports: [atleta_service_1.AtletaService],
    })
], AtletaModule);
//# sourceMappingURL=atleta.module.js.map