import {ChangeDetectorRef, Component, EventEmitter, forwardRef, OnInit, Output} from '@angular/core';
import {FieldType} from '@ngx-formly/material';
import {FieldTypeConfig} from '@ngx-formly/core';
import Fuse from 'fuse.js';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {ConnectionStatus, NetworkService} from "@bracit/angular/core";


interface Options {
  left?: string;
  right?: string;
}


@Component({
  selector: 'app-searchable-dropdown-type',
  templateUrl: 'multiselect-splitter.component.html',
  styleUrls: ['multiselect-splitter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectSplitterComponent),
      multi: true,
    },
  ],
})


export class MultiselectSplitterComponent extends FieldType<FieldTypeConfig> implements OnInit {


  @Output() selectedDataChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  loader: boolean = true
  grouped: boolean = false
  labelLeft: any
  isRequired: any
  labelRight: string | undefined
  rightData: any = []
  leftSearchTerm: string = '';
  rightSearchTerm: string = '';
  initialLeftData: any
  fuse: Fuse<any> | undefined
  fuseLeft: Fuse<any> | undefined
  initialRightData: any
  rightLength: number | undefined
  leftData: any = []
  leftLength: number = 0
  leftSearchLength: number = 0
  rightSearchLength: number | undefined;



  override get formControl(): NonNullable<FieldTypeConfig["formControl"]> {
    return super.formControl;
  }

  constructor(private cdr:ChangeDetectorRef) {
    super();
  }

  async ngOnInit() {

    this.grouped = this.props['grouped']


    const options = this.props.options as Options[];
    this.labelLeft = options[0]?.left;
    this.isRequired = this.props.required;
    this.labelRight = options[1]?.right;

    try {
      await new Promise<void>((resolve) => {
        this.props['dataList'].subscribe((item: any[]) => {

          if (!this.grouped) {
            this.rightData = item.map((item) => ({
              id: item[this.props['valueProp']],
              label: item[this.props['labelProp']],
              disable: false,
            }));

            this.rightLength = this.rightData.length;
            this.rightSearchLength = this.rightData.length;
            this.initialRightData = [...this.rightData]
            this.loader = false;
            this.formControl.valueChanges.subscribe((newValue) => {
              if (newValue) {
                this.leftDataGenerator(newValue)
              } else {
                this.leftData = []
                this.rightData = this.rightData.map((course: any) => ({...course, disable: false}));
                this.initialRightData = [...this.rightData]
                this.rightLength = this.initialRightData.length;
                this.rightSearchLength = this.initialRightData.length;
                this.formControl.markAsTouched()
                this.formControl.markAsDirty()

                this.loader = false;
                this.cdr.detectChanges()
              }
            });

            this.fuse = new Fuse(this.initialRightData, {
              keys: ['label'],
              includeScore: true,
              threshold: 0.5,
            });


            resolve();
          } else {
            this.rightData = item.map((item) => ({
              id: item[this.props['valueProp']],
              key: item[this.props['groupKey']],
              disable: false,
            }));

            this.rightData = [
              {
                id: 1,
                key: 'CSE',
                data: [
                  {value: 1, label: 'Science', disabled: false, visible: true},
                  {value: 2, label: 'Math', disabled: false, visible: true},
                  {value: 3, label: 'English', disabled: false, visible: true},
                ],
                disabled: false
              },
              {
                id: 2,
                key: 'BBA',
                data: [
                  {value: 2, label: 'Math', disabled: false,  visible: true},
                  {value: 4, label: 'Statistics', disabled: false, visible: true},
                  {value: 3, label: 'English', disabled: false, visible: true},
                ],
                disabled: false
              },]

            this.initialRightData = [...this.rightData]
            this.rightLength = this.rightData.reduce((totalLength: any, group: { data: string | any[]; }) => totalLength + group.data.length, 0);
            this.rightSearchLength = this.rightLength
            this.loader = false


            this.formControl.valueChanges.subscribe((newValue) => {
              if (newValue) {
                this.leftGroupDataGenerator(newValue)
              } else {
                console.log('I occured')
              }
            });
          }
        });
      });
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  add(id: number, key?: number) {
    if (!this.grouped) {
      if (this.formControl.value) {
        this.formControl.value.push(id)
        this.formControl.setValue(this.formControl.value)
        this.formControl.markAsTouched()
        this.formControl.markAsDirty()
        this.cdr.detectChanges()

      } else {
        this.formControl.setValue([id])
        this.formControl.markAsTouched()
        this.formControl.markAsDirty()
      }
    } else {
      const group = this.rightData.find((group: { id: number | undefined; }) => group.id === key);
      const option = group?.data.find((data: { value: number; }) => data.value === id);
      if (group && option) {
        option.disabled = true;
        group.disabled = group.data.every((data: { disabled: any; }) => data.disabled);
      }

      this.formValueSetter()
      this.formControl.markAsTouched()
      this.formControl.markAsDirty()
    }

  }

  remove(id: number, key?: number) {
    if (!this.grouped) {
      const updatedIds = this.formControl.value.filter((value: number) => value !== id);
      this.formControl.setValue(updatedIds);
      this.formControl.markAsTouched()
      this.formControl.markAsDirty()
      this.cdr.detectChanges()
    } else {
      const group = this.rightData.find((group: { id: number | undefined; }) => group.id === key);
      const option = group?.data.find((data: { value: number; }) => data.value === id);
      if (group && option) {
        option.disabled = false;
        group.disabled = group.data.every((data: { disabled: any; }) => data.disabled);
      }
      this.formValueSetter()

    }
  }

  rightSearch() {
    if (!this.grouped) {
      if (this.rightSearchTerm === '') {
        this.rightData = [...this.initialRightData];
        this.rightSearchLength = this.initialRightData.length;
      } else {
        if (this.props['fuzzy']) {
          const searchResults = this.fuse?.search(this.rightSearchTerm); // Use optional chaining
          if (searchResults) {
            this.rightData = searchResults.map(result => result.item);
            this.rightSearchLength = this.rightData.length;
          }
        } else {
          const lowerCaseSearchQuery = this.rightSearchTerm.toLowerCase();
          this.rightData = this.initialRightData.filter((course: { label: string }) =>
            course.label.toLowerCase().includes(lowerCaseSearchQuery)
          );
          this.rightSearchLength = this.rightData.length;
        }
        this.cdr.detectChanges();
      }
    } else {
      if (this.rightSearchTerm === '') {
        this.rightData = [...this.initialRightData];
        this.rightSearchLength = this.rightData.reduce(
          (total: any, group: { data: { filter: (arg0: (dataItem: any) => any) => { (): any; new(): any; length: any } } }) =>
            total + group.data.filter((dataItem: { visible: any }) => dataItem.visible).length,
          0
        );
      } else {
        const searchTerm = this.rightSearchTerm.toLowerCase();
        this.rightData = this.rightData.map((group: { key: string; data: any[] }) => {
          const keyMatches = group.key.toLowerCase().includes(searchTerm);
          const filteredData = group.data.map((dataItem: { label: string }) => {
            const labelMatches = dataItem.label.toLowerCase().includes(searchTerm);
            return {
              ...dataItem,
              visible: keyMatches || labelMatches,
            };
          });
  
          return {
            ...group,
            data: filteredData,
          };
        });
  
        this.rightSearchLength = this.rightData.reduce(
          (total: any, group: { data: { filter: (arg0: (dataItem: any) => any) => { (): any; new(): any; length: any } } }) =>
            total + group.data.filter((dataItem: { visible: any }) => dataItem.visible).length,
          0
        );
        this.cdr.detectChanges();
      }
    }
  }
  
  leftSearch() {
    if (this.leftSearchTerm === '') {
      this.leftData = [...this.initialLeftData];
      this.leftSearchLength = this.initialLeftData.length;
    } else {
      if (this.props['fuzzy']) {
        const searchResults = this.fuseLeft?.search(this.leftSearchTerm); // Use optional chaining
        if (searchResults) {
          this.leftData = searchResults.map(result => result.item);
          this.leftSearchLength = this.leftData.length;
          this.rightLength = this.rightData.length;
        }
      } else {
        const lowerCaseSearchQuery = this.leftSearchTerm.toLowerCase();
        this.leftData = this.initialLeftData.filter((course: { label: string }) =>
          course.label.toLowerCase().includes(lowerCaseSearchQuery)
        );
        this.leftSearchLength = this.leftData.length;
      }
    }
  }
  


  shiftAllFromRightToLeft() {
    if (!this.grouped) {
      const allIds: number[] = this.rightData.map((course: { id: any; }) => course.id);
      if (this.formControl.value) {
        this.formControl.value.push(...allIds)
        this.formControl.setValue(this.formControl.value)
      } else {
        this.formControl.setValue(allIds)
      }
    }
    else{
          this.disableVisibleItems();
    }

  }

  disableVisibleItems() {
    this.rightData.forEach((group: { data: any[]; disabled: any; }) => {
      group.data.forEach((dataItem: { visible: any; disabled: boolean; }) => {
        if (dataItem.visible) {
          dataItem.disabled = true;
        }
      });

      // Update the 'disabled' property of the group based on visible items
      group.disabled = group.data.every((dataItem: { visible: any; disabled: any; }) => dataItem.visible && dataItem.disabled);
    });
  }

  shiftAllFromLeftToRight() {
    let updatedIds = this.formControl.value;

    if (this.leftData) {
      const allIds: number[] = this.leftData.map((course: { id: any; }) => course.id);

      allIds.forEach((id: number) => {
        updatedIds = updatedIds.filter((value: number) => value !== id);
      });
      this.formControl.setValue(updatedIds);
      this.formControl.markAsTouched()
      this.formControl.markAsDirty()
    } else {
      this.formControl.setValue([]);
    }
  }

  public restFuse() {
    this.fuseLeft = new Fuse(this.initialLeftData, {
      keys: ['label'],
      includeScore: true,
      threshold: 0.5,
    });
  }


  private leftDataGenerator(value: string | any[]) {
    this.props['dataList'].subscribe((item: any[]) => {
      this.rightData = item.map((item: { [x: string]: any; }) => ({
        id: item[this.props['valueProp']],
        label: item[this.props['labelProp']],
        disable: false,
      }));


      this.initialRightData = [...this.rightData]
      this.rightSearchLength = this.initialRightData.length


      this.fuse = new Fuse(this.initialRightData, {
        keys: ['label'],
        includeScore: true,
        threshold: 0.5,
      });

      let x: any = []
      for (const item of this.rightData) {
        if (value.includes(item.id)) {
          item.disable = true
          x.push(item);
        }
      }
      this.leftData = x
      this.initialLeftData = [...this.leftData]
      this.leftLength = this.leftData.length
      this.leftSearchLength = this.leftLength
      this.restFuse()

      this.rightSearch()
      this.leftSearch()
    })
  }


  private leftGroupDataGenerator(value: any[]) {
    value.forEach((group: { key: any; data: any[]; }) => {
      const matchingGroup = this.rightData.find((rightGroup: { id: any; }) => rightGroup.id === group.key);

      if (matchingGroup) {
        group.data.forEach((dataId: any) => {
          const matchingData = matchingGroup.data.find((dataItem: { value: any; }) => dataItem.value === dataId);
          if (matchingData) {
            matchingData.disabled = true;
          }
        });
        matchingGroup.disabled = matchingGroup.data.every((dataItem: { disabled: any; }) => dataItem.disabled);
      }
    });

    this.leftData= this.rightData
  }
  groupAdd(item: any) {
    const group = this.rightData.find((dataGroup: { id: any; }) => dataGroup.id === item);
    if (group) {
      group.disabled = true;
      group.data.forEach((dataItem: { disabled: boolean; }) => (dataItem.disabled = true));
    }
    this.formValueSetter()
  }

  groupRemove(item: any) {
    const group = this.rightData.find((dataGroup: { id: any; }) => dataGroup.id === item);
    if (group) {
      group.disabled = false;
      group.data.forEach((dataItem: { disabled: boolean; }) => (dataItem.disabled = false));
    }
    this.formValueSetter()
  }

  hasDisabledItems(data: any[]): boolean {
    return data.some(item => item.disabled);
  }

  hasVisibleItems(data: any[]): boolean {
    return data.some(item => item.visible);
  }

  formValueSetter() {
    const restructuredData = this.rightData.map((item: { id: any; data: any[]; }) => ({
      key: item.id,
      data: item.data
        .filter((dataItem: { disabled: any; }) => dataItem.disabled)
        .map((dataItem: { value: any; }) => dataItem.value)
    }));
    const allDataEmpty = restructuredData.every((item: { data: string | any[]; }) => item.data.length === 0);
    this.formControl.setValue(allDataEmpty ? [] : restructuredData);
    this.formControl.markAsTouched();
    this.formControl.markAsDirty();
  }

  protected readonly Math = Math;
}
