import "reflect-metadata";
import { Author } from "../interfaces";
import { INJECTION_TYPE } from "../constants";
import { InjectionType } from "@notadd/core/constants/injection.constants";

export function Module(obj: {
    authors?: Array<Author>,
    description?: string,
    exports?: Array<any>,
    identification: string,
    imports?: Array<any>,
    components?: Array<any>,
    controllers?: Array<any>,
    modules?: Array<any>,
    name: string,
    version: string,
}): ClassDecorator {
    obj.modules = obj.imports && !obj.modules ? obj.imports : obj.modules;

    return (target: any) => {
        for (const property in obj) {
            if (obj.hasOwnProperty(property)) {
                Reflect.defineMetadata(property, obj[property], target);
            }
        }
        Reflect.defineMetadata(INJECTION_TYPE, InjectionType.Module, target);
    };
}
