import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {MatInputModule} from '@angular/material/input';
import {SearchableDropdownTypeComponent} from "./searchable-dropdown-type.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormlyMaterialModule} from "@ngx-formly/material";

@NgModule({
  declarations: [
    SearchableDropdownTypeComponent
  ],
  exports: [
    SearchableDropdownTypeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    FormlyMaterialModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'searchdropdown',
          component: SearchableDropdownTypeComponent,
          wrappers: ['form-field'],
        },
      ],
      validationMessages: [{ name: 'required', message: 'This field is required' }],
    }),
  ]
})
export class SearchableDropdownTypeModule {
}
