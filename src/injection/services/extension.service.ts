import "reflect-metadata";
import { Component } from "@nestjs/common";
import { Extension } from "../types/extension.type";
import { InjectionService } from "./injection.service";
import { InjectionType } from "@notadd/core/constants/injection.constants";
import { SettingService } from "@notadd/setting/services/setting.service";

@Component()
export class ExtensionService {
    private initialized: boolean = false;

    private extensions: Array<Extension> = [];

    constructor(
        private readonly injectionService: InjectionService,
        private readonly settingService: SettingService,
    ) {
        this.extensions = this.injectionService
            .loadInjections()
            .filter((instance: Function) => {
                const injectionType = Reflect.getMetadata("__injection_type__", instance);

                return injectionType === InjectionType.Addon;
            })
            .map((instance: Function) => {
                return {
                    identification: Reflect.getMetadata("identification", instance),
                    location: "",
                };
            });
        this.initialized = true;
    }

    /**
     * @param { string } identification
     *
     * @returns { Promise<Extension | undefined> }
     */
    public async disableExtension(identification: string): Promise<Extension | undefined> {
        const extension: Extension | undefined = await this.getExtension(identification);
        if (!extension) {
            throw new Error("Extension do not exists!");
        }

        return extension;
    }

    /**
     * @param { string } identification
     *
     * @returns { Promise<Extension | undefined> }
     */
    public async enableExtension(identification: string): Promise<Extension | undefined> {
        const extension: Extension | undefined = await this.getExtension(identification);
        if (!extension) {
            throw new Error("Extension do not exists!");
        }

        return extension;
    }

    /**
     * @param { string } identification
     *
     * @returns { Promise<Extension | undefined> }
     */
    public async getExtension(identification: string): Promise<Extension | undefined> {
        return this.extensions.find((extension: Extension) => {
            return extension.identification === identification;
        });
    }

    /**
     * @param { Object } filter
     *
     * @returns { Promise<Array<Extension>> }
     */
    public async getExtensions(filter: object): Promise<Array<Extension>> {
        return this.extensions;
    }

    /**
     * @param { string } identification
     *
     * @returns { Promise<Extension | undefined> }
     */
    public async installExtension(identification: string): Promise<Extension | undefined> {
        const extension: Extension | undefined = await this.getExtension(identification);
        if (!extension) {
            throw new Error("Extension do not exists!");
        }

        return extension;
    }

    /**
     * @param { string } identification
     *
     * @returns { Promise<Extension | undefined> }
     */
    public async uninstallExtension(identification: string): Promise<Extension | undefined> {
        const extension: Extension | undefined = await this.getExtension(identification);
        if (!extension) {
            throw new Error("Extension do not exists!");
        }

        return extension;
    }
}
