"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@notadd/core");
const application_module_1 = require("./modules/application.module");
const common_1 = require("@nestjs/common");
const ip = require("ip");
const swagger_1 = require("@nestjs/swagger");
const packages_1 = require("nestjs-flub/packages");
const express = require("express");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const port = 3000;
        const address = `http://${ip.address()}:${port}`;
        const server = express();
        server.use(express.static(process.cwd() + '/public/'));
        /**
         * @type { INestApplication }
         */
        const application = yield core_1.NotaddFactory.create(application_module_1.ApplicationModule, server);
        application.useGlobalFilters(new packages_1.FlubErrorHandler());
        /**
         * @type { Logger }
         */
        const logger = new common_1.Logger('NotaddFactory', true);
        /**
         * @type { SwaggerBaseConfig }
         */
        const options = new swagger_1.DocumentBuilder()
            .setTitle('Notadd')
            .setDescription('API document for Notadd.')
            .setVersion('2.0')
            .addBearerAuth()
            .build();
        /**
         * @type {SwaggerDocument}
         */
        const document = swagger_1.SwaggerModule.createDocument(application, options);
        swagger_1.SwaggerModule.setup('/api-doc', application, document);
        yield application.listen(port, () => {
            logger.log(`Server on: ${address}`);
        });
    });
}
exports.bootstrap = bootstrap;
