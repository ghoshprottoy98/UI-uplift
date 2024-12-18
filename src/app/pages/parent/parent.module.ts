import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ParentComponent} from './parent.component';
import {RouterModule} from '@angular/router';
import {CoreModule} from "@bracit/angular/core";
import {ChildComponent} from "./child/child.component";

@NgModule({
  declarations: [
    ParentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ParentComponent,
      },
      {
        path: 'child',
        component: ChildComponent,
      },
    ]),
    CoreModule,
  ]
})
export class ParentModule {
}
