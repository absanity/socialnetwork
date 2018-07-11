import {Injectable} from '@angular/core';

@Injectable()
export class VariableService {

  private _mainUrl = "http://192.168.246.130:3000/"

  constructor() {
  }

  getMainUrl() {
    return this._mainUrl  }
}
