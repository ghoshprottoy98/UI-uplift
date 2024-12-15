import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {controller as btc} from "@bracit/common-utils";
import {HttpClient} from '@angular/common/http';
import {KeycloakEvent, KeycloakEventType, KeycloakService} from "keycloak-angular";
import {environment} from "../../environments/environment";
import {getAbsoluteUrl} from "../utils/app-util";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any;
  private userSubject$ = new BehaviorSubject<any | null>(null);
  user$ = this.userSubject$.asObservable();

  constructor(private keycloak: KeycloakService, private http: HttpClient) {
    keycloak.keycloakEvents$.subscribe(async (ob: KeycloakEvent) => {
      switch (ob.type) {
        case KeycloakEventType.OnReady:
          if (keycloak.isLoggedIn()) {
            const user = await this.loadUserProfile();
            btc.broadcast('login');
            this.userSubject$.next(user);
          }
          break;
        case KeycloakEventType.OnAuthRefreshError:
          btc.broadcast('logout');
          break;
      }
    });

    btc.on('logout', () => {
      window.location.reload();
    });
  }

    async loadUserProfile(): Promise<any> {
        return new Promise(resolve => {
            this.getToken().then(t => {
                const user = JSON.parse(atob(t.split('.')[1]));
                resolve(user);
            })
        });
    }



  async getCurrentUser(): Promise<any> {
    if (this.currentUser) {
      return Promise.resolve(this.currentUser);
    }

    return new Promise(resolve => {
      this.user$.subscribe(u => {
        if (u == null) {
          return;
        }
        this.currentUser = u;
        resolve(u);
      });
    });
  }

  isGranted(role: string): boolean {
    return this.keycloak.isUserInRole(role);
  }

  isGrantedAny(roles: string[]): boolean {
    if (roles.length === 0) {
      return true;
    }

    for (const role of roles) {
      if (this.isGranted(role)) {
        return true;
      }
    }

    return false;
  }


  isGrantedAll(roles: string[]): boolean {
    if (roles.length === 0) {
      return true;
    }

    for (const role of roles) {
      if (!this.isGranted(role)) {
        return false;
      }
    }

    return true;
  }

  getToken(): Promise<string> {
    return this.keycloak.getToken();
  }

  isLoggedIn(): Promise<boolean> {
    return Promise.resolve(this.keycloak.isLoggedIn());
  }

  getUserRoles(): string[] {
    const userRoles = this.keycloak.getUserRoles();

    userRoles.push(this.currentUser.userType)

    return userRoles;
  }

  logout(): Promise<void> {
    btc.broadcast('logout');
    return this.keycloak.logout(environment.production ? getAbsoluteUrl('/') : undefined);
  }
}
