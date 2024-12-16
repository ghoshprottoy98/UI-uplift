import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {Menu} from "../domain/menu";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  readonly ROOT_URL = `${environment.apiUrl}/data/config/menus`;

  constructor(private http: HttpClient) {

  }

  list(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.ROOT_URL);
  }

  ownMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.ROOT_URL, {
      params: new HttpParams({fromObject: {own: 'true'}})
    });
  }

  getRootMenuOption(): Observable<{
    value: number | undefined;
    label: string | undefined;
    module: string | undefined
  }[]> {
    return this.list()
    .pipe(map(l => l
        .filter(m => m.parentId == null)
        .map(menu => ({value: menu.id, label: menu.title, module: menu.module})))
    );
  }
}

