import { SettingUpdateHandler } from "./setting-update.handler";
import { SettingRemoveHandler } from "./setting-remove.handler";

export const eventHandlers = [
    SettingRemoveHandler,
    SettingUpdateHandler,
];
