import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ColDef} from 'ag-grid-community';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.css'
})
export class LayoutsComponent implements OnInit {

  @Input() backgroundColor: string = 'transparent';

  dataSource: any = [
    {assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true},
    {assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false},
    {assessmentName: 'History Exam', assessmentType: 'Test', isActive: true}
  ];
  loaded = false;
  @Input() pagination: boolean = false;

  columnDefs: ColDef[] = [
    {
      field: 'assessmentName',
      headerName: 'Assessment Name',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'assessmentType',
      headerName: 'Assessment Type',
      filter: 'agTextColumnFilter',
      valueFormatter: (item) => {
        if (item.value) {
          return item.value.replace(/_/g, ' ');
        } else {
          return '';
        }
      },
    },
    {
      headerName: "Active",
      field: "isActive",
      type: 'boolean',
      filterParams: {
        filterValues: {
          true: 'Yes',
          false: 'No'
        }
      },
      filter: 'boolean',
      cellRenderer: 'booleanCellRenderer'
    },
  ];

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {

  }

}
