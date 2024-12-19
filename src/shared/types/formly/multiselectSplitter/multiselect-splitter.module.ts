import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MultiselectSplitterComponent} from './multiselect-splitter.component';
import {FormlyModule} from "@ngx-formly/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CdkMenuItemCheckbox} from "@angular/cdk/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSelectModule} from "@angular/material/select";
import {NgxMatDatetimePickerModule} from "@angular-material-components/datetime-picker";


@NgModule({
  declarations: [
    MultiselectSplitterComponent
  ],
  exports: [
    MultiselectSplitterComponent
  ],
  imports: [
    CommonModule,
    FormlyModule.forRoot({
      types: [{name: 'multiselect-splitter', component: MultiselectSplitterComponent}],
    }),
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatOptionModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatCheckboxModule,
    CdkMenuItemCheckbox,
    MatTooltipModule,
    MatSelectModule,
    NgxMatDatetimePickerModule
  ]
})
export class MultiselectSplitterModule {
}
