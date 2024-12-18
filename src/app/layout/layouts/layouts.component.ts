import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ColDef} from 'ag-grid-community';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.css'
})
export class LayoutsComponent implements OnInit {

  @Input() backgroundColor: string = 'transparent';
  @Input() pagination: boolean = false;
  dataUrl = '/api/bpa/task/ready'

  columnDefs: ColDef[] = [
    {field: 'name', filter: 'agTextColumnFilter', minWidth: 150},
    {field: 'key', filter: 'agTextColumnFilter'},
    {field: 'module', filter: 'agTextColumnFilter'},
    {
      colId: '__action',
      type: 'actionColumn',
      cellRendererParams: {
        actions: [
          {
            title: 'View',
            icon: 'account_tree',
            class: 'success',
            click: (node: any) => {
              console.log(node);
            }
          },
          {
            title: 'All process',
            icon: 'format_list_bulleted',
            id: 'history',
          },
          {
            title: 'Edit',
            icon: 'edit',
          },
          {
            title: 'Remove',
            icon: 'delete',
            class: 'warn',
          },
        ]
      },
    }
  ];
  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {

  }

}
