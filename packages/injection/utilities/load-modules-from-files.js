"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const import_classes_from_directories_1 = require("./import-classes-from-directories");
const path_1 = require("path");
const loaders_1 = require("@notadd/core/loaders");
function loadModulesFromFiles() {
    const file = path_1.join(process.cwd(), "storages", "caches", "module.json");
    if (fs_1.existsSync(file)) {
        const caches = loaders_1.Json.load(file);
        return import_classes_from_directories_1.importClassesFromDirectories(caches.enabled ? caches.enabled : []);
    }
    else {
        return [];
    }
}
exports.loadModulesFromFiles = loadModulesFromFiles;

//# sourceMappingURL=load-modules-from-files.js.map
