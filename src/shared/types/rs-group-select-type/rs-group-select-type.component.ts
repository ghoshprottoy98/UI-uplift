// import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
// import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
// import {NgSelectComponent} from '@ng-select/ng-select';
// import {BehaviorSubject, of, Subject} from 'rxjs';
// import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
// import {catchError, distinctUntilChanged, map, startWith, switchMap, tap} from 'rxjs/operators';
// import {environment} from '../../../../environments/environment';

// @Component({
//   selector: 'app-rs-select-type',
//   template: `
//     <ng-select
//         class="w-100 user-selector"
        
//         [bindLabel]="bindLabel"
//         [bindValue]="bindValue"
//         [loading]="loading"
//         [items]="items$ | async"
//         [minTermLength]="minTermLength"
//         [placeholder]="placeholder"
//         (scroll)="onScroll($event)"
//         (change)="onChange($event)"
//         (scrollToEnd)="onScrollToEnd()"
//         [typeahead]="searchInput$"
//         [closeOnSelect]="closeOnSelect"
//         [trackByFn]="trackByFn"
//     >
//       <ng-template [ngIf]="minTermLength>0" ng-typetosearch-tmp>
//         <div class="ng-option disabled">
//           Please enter {{minTermLength}} or more characters...
//         </div>
//       </ng-template>
//     </ng-select>
//   `,
//   providers: [
//     {
//       provide: NG_VALUE_ACCESSOR,
//       multi: true,
//       useExisting: RsGroupSelectTypeComponent
//     }
//   ]
// })
// export class RsGroupSelectTypeComponent implements ControlValueAccessor, OnInit, OnDestroy {

//   @ViewChild(NgSelectComponent, {static: true}) selectComponent!: NgSelectComponent;
//   private itemsSubject$ = new BehaviorSubject<any[]>([]);
//   private items = [];
//   items$ = this.itemsSubject$.asObservable();
//   searchInput$ = new Subject<string>();

//   private value;

//   url = environment.apiUrl + '/data/autocomplete';

//   loading = false;
//   private page = 0;
//   private term = '';
//   private more = false;
//   private propagateChanges: any = Function.prototype;
//   selected;

//   @Input() formType;
//   @Input() fieldName;
//   @Input() minTermLength;
//   @Input() bindLabel = 'text';
//   @Input() bindValue = 'id';
//   @Input() placeholder: string;
//   @Input() closeOnSelect = true;
//   // eslint-disable-next-line @angular-eslint/no-output-native
//   @Output() change = new EventEmitter();
//   @Input() extraParams: () => any = () => null;

//   constructor(private http: HttpClient) {
//   }

//   onChange($event) {
//     this.propagateChanges($event);
//     this.change.emit($event);
//   }

//   trackByFn(item: any) {
//     return item[this.bindValue];
//   }

//   compareWith(a, b) {
//     return a[this.bindValue] === b[this.bindValue];
//   }

//   ngOnInit() {
//     this.loadSelected();
//     this.loadItems();
//   }

//   onScrollToEnd() {
//     this.fetchMore();
//   }

//   onScroll({end}) {
//     if (this.loading || this.more === false) {
//       return;
//     }

//     if (end + 10 > this.items.length) {
//       this.fetchMore();
//     }
//   }

//   private fetchMore() {

//     this.loading = true;
//     this.page++;
//     return this.doServerRequest().subscribe(res => {
//       this.more = res.more;
//       if (res.results.length > 0) {
//         this.items = this.items.concat(res.results);
//       }
//       this.itemsSubject$.next(this.items);
//       this.loading = false;
//     });
//   }

//   private doServerRequest() {
//     let extraParams = this.extraParams();

//     if (!extraParams) {
//       extraParams = {};
//     }

//     const queryParams = Object.assign(extraParams, {
//       q: this.term,
//       page: this.page + '',
//       field_name: this.fieldName + '',
//       type: this.formType
//     });

//     return this.http.get<any>(this.url, {
//       headers: new HttpHeaders({'no-loader': 'true'}),
//       params: new HttpParams({
//         fromObject: queryParams
//       })
//     });
//   }

//   private loadSelected() {
//     if (!this.value) {
//       return;
//     }

//     const q = Array.isArray(this.value) ? this.value.join(',') : this.value;
//     return this.http.get<any>(this.url + '/selected', {
//       params: new HttpParams({
//         fromObject: {
//           q, field_name: this.fieldName + '', type: this.formType
//         }
//       })
//     }).subscribe(i => {
//       this.selectComponent.writeValue(i);
//     });
//   }

//   private fetch(q) {
//     this.term = q;

//     if (this.minTermLength > 0 && (!q || q.length < this.minTermLength)) {
//       return of({results: []});
//     }

//     this.page = 1;

//     return this.doServerRequest();
//   }

//   private loadItems() {
//     this.searchInput$.pipe(
//         distinctUntilChanged(),
//         startWith(''),
//         tap(() => {
//           this.loading = true;
//         }),
//         switchMap(term => this.fetch(term ? term.trim() : term).pipe(
//             catchError(() => of({results: []})), // empty list on error
//             tap(() => this.loading = false)
//         ).pipe(map(l => {
//           this.more = l.more || false;
//           return l.results;
//         })))
//     ).subscribe(i => {
//       this.items = i;
//       this.itemsSubject$.next(i);
//     });
//   }

//   ngOnDestroy(): void {
//     this.selectComponent.ngOnDestroy();
//   }

//   writeValue(obj: any): void {
//     this.selectComponent.writeValue(obj);
//   }

//   registerOnChange(fn: any): void {
//     this.propagateChanges = fn;
//     this.selectComponent.registerOnChange(fn);
//   }

//   registerOnTouched(fn: any): void {
//     this.selectComponent.registerOnTouched(fn);
//   }

//   setDisabledState?(isDisabled: boolean): void {
//     this.selectComponent.setDisabledState(isDisabled);
//   }
// }
