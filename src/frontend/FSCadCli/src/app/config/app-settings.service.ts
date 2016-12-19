import { Injectable } from '@angular/core';

@Injectable()
export class AppSettingsService {

    private _config: ISettings;

    constructor() {
        this._config = require("./app.settings.json");
    }

    urlBase(complemento:string) {
        return this._config.endPoint + complemento;
    }

}

export interface ISettings {
    endPoint: string;
}