import {Injectable, isDevMode} from '@angular/core';
import {environment} from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private static idpConfig: { url: any; realm: any; clientId: any; };
  private static config: { [id: string]: any; } = {};

  static get(key: string): any {
    return AppConfigService.config.hasOwnProperty(key) ? this.config[key] : null;
  }

  // This is the method you want to call at bootstrap
  // Important: It should return a Promise
  public init() {
    return Promise.resolve({});
  }

  static getIdpConfig() {
    if (this.idpConfig) {
      return this.idpConfig;
    }

    this.idpConfig = environment.idpConfig;

    if(isDevMode()) {
      return environment.idpConfig;
    }

    this.idpConfig.url = this.getIdpUrl();
    this.idpConfig.realm = this.getIdpRealm();
    this.idpConfig.clientId = this.getIdpClient();

    return this.idpConfig;
  }

  static getIdpUrl() {
    const element = document.querySelector('meta[name=idp-url]');
    return element == null ? environment.idpConfig.url : element.getAttribute('content');
  }

  static getIdpRealm() {
    const element = document.querySelector('meta[name=idp-realm]');
    return isDevMode() || element == null ? environment.idpConfig.realm : element.getAttribute('content');
  }

  static getIdpClient() {
    const element = document.querySelector('meta[name=idp-client]');
    return isDevMode() || element == null ? environment.idpConfig.clientId : element.getAttribute('content');
  }

  static getBaseUrl() {
    const element = document.querySelector('base')
    return isDevMode() || element == null ? '/' : element.getAttribute('href');
  }
}
