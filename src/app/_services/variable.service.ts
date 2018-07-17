import {Injectable} from '@angular/core';

@Injectable()
export class VariableService {

  private _mainUrl = "http://localhost:3000/"

  constructor() {
  }

  getMainUrl() {
    return this._mainUrl  }
}
