import {Injectable} from '@angular/core';

@Injectable()
export class VariableService {

  private _mainUrl = "http://192.168.160.133:3000/"

  constructor() {
  }

  getMainUrl() {
    return this._mainUrl  }
}
