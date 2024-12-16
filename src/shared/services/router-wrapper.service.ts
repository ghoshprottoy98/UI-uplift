import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterWrapper {
  private routerData: any;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.prepareRouteData();
      }
    });
  }

  getRouter() {
    return this.router;
  }

  public getRouteData() {
    if (!this.routerData) {
      this.prepareRouteData();
    }
    return this.routerData;
  }

  public getRouterTitle() {
    return this.getRouteData()?.title;
  }

  redirectTo(uri: string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate([uri]));
  }

  private prepareRouteData() {
    let data: any = {};
    const stack: ActivatedRouteSnapshot[] = [this.router.routerState.snapshot.root];
    while (stack.length > 0) {
      const route = stack.pop();
      data = {...data, ...route?.data};
      stack.push(...(route?.children || []));
    }

    this.routerData = data;
  }
}
