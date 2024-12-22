import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FieldType} from '@ngx-formly/material';
import {FieldTypeConfig} from "@ngx-formly/core";
import {BehaviorSubject, ReplaySubject, Subject, takeUntil} from "rxjs";
import {FormControl} from "@angular/forms";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-searchable-select-type',
  template: `
    <mat-form-field class="field-width">
      <mat-label>{{ props.label || '' }}</mat-label>
      <mat-select
        #select
        [formControl]="formControl"
        [formlyAttributes]="field"
        [multiple]="props['multiple'] || false"
        [placeholder]="props.label || ''"
        [required]="props.required || false"
        [style.background-color]="'white'"
        (openedChange)="onSelectOpened($event)"
      >
        <mat-option
          [style.background-color]="'white'"
        >
          <ngx-mat-select-search
            [formControl]="dataFilterCtrl"
            [noEntriesFoundLabel]="props['notFound']"
            [placeholderLabel]="props.placeholder || ''"
          >
          </ngx-mat-select-search>
        </mat-option>
        <mat-option *ngIf="props['allowClear'] && props['overRideClear']">--- None ---</mat-option>
        <mat-option
          *ngFor="let item of filteredList | async" [value]="props['valueProp'] ? item[props['valueProp']] : item.id">
          {{ item[props['searchFieldName']] }}
        </mat-option>
      </mat-select>
      <mat-error *ngIf="formControl.invalid && (formControl.dirty || formControl.touched)">
        {{ getErrorMessage(formControl) }}
      </mat-error>
    </mat-form-field>
  `,
  styleUrls: ['./searchable-select-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchableSelectTypeComponent extends FieldType<FieldTypeConfig> implements OnInit, OnDestroy {

  @ViewChild('select', { static: true }) select: MatSelect | undefined;

  public dataFilterCtrl: FormControl<string | null> = new FormControl<string>('');
  public filteredList: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  private dataListSub$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  dataListObs$ = this.dataListSub$.asObservable();

  constructor(private renderer: Renderer2) {
    super();
  }

  override defaultOptions = {
    templateOptions: {
      dataList: this.dataListObs$,
      allowClear: false,
      overRideClear: true,
      label: 'Field label',
      placeholder: 'Field placeholder',
      searchFieldName: 'name',
      notFound: 'No match found'
    }
  };

  protected _onDestroy = new Subject<void>();

  ngOnInit() {
    this.props['dataList'].subscribe((res: any[]) => {
      this.filteredList.next(res);
    });
    this.dataFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData();
      });
    this.props['allowClear'] = !this.props.required;
  }

  override ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private filterData() {
    if (!this.props['dataList']) {
      return;
    }
    let search = this.dataFilterCtrl.value || '';
    if (!search) {
      this.props['dataList'].subscribe((res: any[]) => {
        this.filteredList.next(res);
      });
      return;
    } else {
      search = search.toLowerCase();
    }

    this.props['dataList'].subscribe((res: any[]) => {
      this.filteredList.next(res.filter(el => el[this.props['searchFieldName']].toLowerCase().indexOf(search) > -1));
    });
  }

  getErrorMessage(formControl: any) {
    const control = formControl;
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('availableToSemester')) {
      return 'This cannot be less than "Available from" semester';
    }
    return '';
  }
  onSelectOpened($event: any) {
    const overlayElements = document.getElementsByClassName('cdk-overlay-pane');
    if($event) {
      window.onscroll = () => {
        if(overlayElements.length > 0) {
          const overlayElement = overlayElements[0];
          overlayElement.classList.add('d-none');
          if (this.select) {
            this.select.close();
            this.select._onTouched();  
            this.renderer.removeClass(this.select, 'cdk-focused');
          }
        }
      };
    } else {
      if (overlayElements.length > 0) {
        const overlayElement = overlayElements[0];
        overlayElement.classList.remove('d-none');
      }
      window.onscroll = null;
    }
  }


}
