import { ChangeDetectorRef, Component, OnInit, Input } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.css'
})
export class LayoutsComponent  implements OnInit {

  @Input() backgroundColor: string = 'transparent';

  dataSource: any;
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
      filterParams: {
        filterValues: {
          true: 'Yes',
          false: 'No'
        }
      },
      filter: 'selectFilter',
      cellRenderer: 'booleanCellRenderer'
    },
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.dataSource = [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true }
    ];
  }  

}
