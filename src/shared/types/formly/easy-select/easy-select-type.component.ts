import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {FieldType} from '@ngx-formly/material';
import {NgSelectComponent} from '@ng-select/ng-select';
import {BehaviorSubject, of, Subject} from 'rxjs';
import {catchError, distinctUntilChanged, map, startWith, switchMap, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
// import {environment} from '../../../../../environments/environment';
import {FieldTypeConfig} from "@ngx-formly/core";

@Component({
  selector: 'app-easy-select',
  template: `
    <ng-select
        [id]="id"
        [style]="props['styles']"
        [className]="props['class']"
        [formControl]="formControl"
        [formlyAttributes]="field"
        [tabIndex]="props.tabindex || 0"
        [required]="props.required || false"
        [appearance]="props['appearance']"
        [bindLabel]="props['bindLabel']"
        [bindValue]="props['bindValue']"
        [virtualScroll]="props['virtualScroll']"
        [loading]="loading"
        [placeholder]="props.placeholder || ''"
        [items]="items$ | async"
        [addTag]="props['addTag']"
        [multiple]="props['multiple']"
        [hideSelected]="props['hideSelected']"
        [trackByFn]="props['trackByFn']"
        [compareWith]="props['compareWith']"
        [minTermLength]="props['minTermLength']"
        [maxSelectedItems]="props['maxSelectedItems']"
        [typeahead]="searchInput$"
        (scroll)="onScroll($event)"
        [appendTo]="props['appendTo']"
        (scrollToEnd)="onScrollToEnd()">
      <ng-template [ngIf]="props['minTermLength']>0" ng-typetosearch-tmp>
        <div class="ng-option disabled">
          Please enter {{props['minTermLength']}} or more characters...
        </div>
      </ng-template>
    </ng-select>
  `,
  styleUrls: ['./easy-select-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EasySelectTypeComponent extends FieldType<FieldTypeConfig> implements OnInit {
  @ViewChild(NgSelectComponent, {static: true}) selectComponent!: NgSelectComponent;
  private itemsSubject$ = new BehaviorSubject<any[]>([]);
  private items = [];
  items$ = this.itemsSubject$.asObservable();
  searchInput$ = new Subject<string>();

  loading = false;
  private page = 0;
  private term = '';
  private more = false;
  selected: any;

  override defaultOptions = {
    props: {
      bindLabel: 'text',
      placeholder: '',
      virtualScroll: true,
      appendTo: null,
      bindValue: 'id',
      options: [],
      appearance: 'outline',
      minTermLength: 2,
      addTag: false,
      trackByFn: this.trackByFn,
      compareWith: this.compareWith,
      hideSelected: true,
      multiple: false,
      extraParams: () => {
      },
      // url: environment.apiUrl + '/data/autocomplete'
    },
  };

  constructor(private http: HttpClient) {
    super();
  }

  trackByFn(item: any) {
    return item.id;
  }

  compareWith(a: { id: any; }, b: { id: any; }) {
    return a.id === b.id;
  }

  ngOnInit() {
    this.props['loadSelected'] = this.loadSelected.bind(this);
    this.loadSelected();
    this.loadItems();
    this.formControl.valueChanges.subscribe(() => {
      if (!this.formControl.dirty) {
        this.loadSelected();
      }
    });
  }

  onScrollToEnd() {
    this.fetchMore();
  }

  onScroll({end}: { end: number }) {
    if (this.loading || !this.more) {
      return;
    }

    if (end + 10 > this.items.length) {
      this.fetchMore();
    }
  }

  private fetchMore() {

    this.loading = true;
    this.page++;
    return this.doServerRequest().subscribe(res => {
      this.more = res.more;
      if (res.results.length > 0) {
        this.items = this.items.concat(res.results);
      }
      this.itemsSubject$.next(this.items);
      this.loading = false;
    });
  }

  private doServerRequest() {
    let extraParams = this.props['extraParams']();

    if (!extraParams) {
      extraParams = {};
    }

    const queryParams = Object.assign(extraParams, {
      q: this.term,
      page: this.page + '',
      field_name: this.fieldName + '',
      type: this.props['formType']
    });

    return this.http.get<any>(this.props['url'], {
      headers: new HttpHeaders({'no-loader': 'true'}),
      params: new HttpParams({
        fromObject: queryParams
      })
    });
  }

  private loadSelected() {
    if (!this.value) {
      return;
    }

    const q = Array.isArray(this.value) ? this.value.join(',') : this.value;
    return this.http.get<any>(this.props['url'] + '/selected', {
      params: new HttpParams({
        fromObject: {
          q, field_name: this.fieldName + '', type: this.props['formType']
        }
      })
    }).subscribe(i => {
      this.selectComponent.writeValue(i);
    });
  }

  get fieldName(): string {
    return this.props['fieldName'] || this.key;
  }

  private fetch(q: string | any[]) {
    let term: string;

    if (Array.isArray(q)) {
      term = q.join(',');
    } else {
      term = q;
    }

    this.term = term;

    if (this.props['minTermLength'] > 0 && (!term || term.length < this.props['minTermLength'])) {
      return of({results: []});
    }

    this.page = 1;

    return this.doServerRequest();
  }

  override onContainerClick(event: MouseEvent): void {
    super.onContainerClick(event);
    this.selectComponent.focus();
  }

  private loadItems() {
    this.searchInput$.pipe(
        distinctUntilChanged(),
        startWith(''),
        tap(() => {
          this.loading = true;
        }),
        switchMap(term => this.fetch(term ? term.trim() : term).pipe(
            catchError(() => of({results: []})), // empty list on error
            tap(() => this.loading = false)
        ).pipe(map(l => {
          this.more = l.more || false;
          return l.results;
        })))
    ).subscribe(i => {
      this.items = i;
      this.itemsSubject$.next(i);
    });
  }
}
