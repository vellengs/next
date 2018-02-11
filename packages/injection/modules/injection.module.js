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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const addon_module_1 = require("./addon.module");
const extension_module_1 = require("./extension.module");
const injection_service_1 = require("../services/injection.service");
const common_1 = require("@nestjs/common");
const module_module_1 = require("./module.module");
const user_module_1 = require("@notadd/user/modules/user.module");
const user_service_1 = require("@notadd/user/services/user.service");
const dashboard_service_1 = require("../services/dashboard.service");
const dashboard_explorer_service_1 = require("../services/dashboard-explorer.service");
const dashboard_resolvers_1 = require("../resolvers/dashboard.resolvers");
const metadata_scanner_1 = require("@nestjs/core/metadata-scanner");
const setting_module_1 = require("@notadd/setting/modules/setting.module");
const developer_dashboard_1 = require("../dashboards/developer.dashboard");
let InjectionModule = class InjectionModule {
    constructor(dashboardExplorerService, dashboardService, userService) {
        this.dashboardExplorerService = dashboardExplorerService;
        this.dashboardService = dashboardService;
        this.userService = userService;
        this.logger = new common_1.Logger("NotaddExtension", true);
    }
    onModuleInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dashboardService.initialize(this.dashboardExplorerService.explore());
            const administration = this.userService.getUserById(1);
            if (!administration) {
                yield this.userService.createUser({
                    username: "admin",
                    email: "admin@notadd.com",
                    password: "123qwe",
                });
                this.logger.log("Administration Username: admin");
                this.logger.log("Administration Password: 123qwe");
            }
            else {
                this.logger.log("Administration exists!");
            }
        });
    }
};
InjectionModule = __decorate([
    common_1.Module({
        components: [
            dashboard_explorer_service_1.DashboardExplorerService,
            dashboard_resolvers_1.DashboardResolvers,
            dashboard_service_1.DashboardService,
            developer_dashboard_1.DeveloperDashboard,
            injection_service_1.InjectionService,
            metadata_scanner_1.MetadataScanner,
        ],
        exports: [
            injection_service_1.InjectionService,
        ],
        imports: [
            common_1.forwardRef(() => extension_module_1.ExtensionModule),
            common_1.forwardRef(() => module_module_1.ModuleModule),
            common_1.forwardRef(() => addon_module_1.AddonModule),
            setting_module_1.SettingModule,
            user_module_1.UserModule,
        ],
    }),
    __metadata("design:paramtypes", [dashboard_explorer_service_1.DashboardExplorerService,
        dashboard_service_1.DashboardService,
        user_service_1.UserService])
], InjectionModule);
exports.InjectionModule = InjectionModule;
