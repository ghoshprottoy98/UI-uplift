import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { FieldTypeConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-searchable-dropdown-type',
  template: `
    <input
      matInput
      [matAutocomplete]="auto"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [placeholder]="props.placeholder!"
      [errorStateMatcher]="errorStateMatcher"
    />
    <mat-autocomplete #auto="matAutocomplete">
      <mat-option *ngFor="let value of filter | async" [value]="value">
        {{ value }}
      </mat-option>
    </mat-autocomplete>
  `,
})
export class SearchableDropdownTypeComponent extends FieldType<FieldTypeConfig> implements OnInit {
  filter: Observable<any> | undefined;
  override defaultOptions = {
    props: {
      placeholder: 'Select a option'
    },
  };

  ngOnInit() {
    console.log('this.props ', this.props);
    this.filter = this.formControl.valueChanges.pipe(
      startWith(''),
      switchMap((term) => this.props['filter'](term)),
    );
  }
}
