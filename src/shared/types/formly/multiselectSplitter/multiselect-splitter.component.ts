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
  fuse: Fuse<any>
  fuseLeft: Fuse<any>
  initialRightData: any
  rightLength: number
  leftData: any = []
  leftLength: number = 0
  leftSearchLength: number = 0
  rightSearchLength: number = 0


  get formControl(): NonNullable<FieldTypeConfig["formControl"]> {
    return super.formControl;
  }

  constructor(private cdr:ChangeDetectorRef) {
    super();
  }

  async ngOnInit() {

    this.grouped = this.props.grouped


    const options = this.props.options as Options;
    this.labelLeft = options[0]?.left;
    this.isRequired = this.props.required;
    this.labelRight = options[1]?.right;

    try {
      await new Promise<void>((resolve) => {
        this.props.dataList.subscribe((item) => {

          if (!this.grouped) {
            this.rightData = item.map((item) => ({
              id: item[this.props.valueProp],
              label: item[this.props.labelProp],
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
                this.rightData = this.rightData.map(course => ({...course, disable: false}));
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
              id: item[this.props.valueProp],
              key: item[this.props.groupKey],
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
            this.rightLength = this.rightData.reduce((totalLength, group) => totalLength + group.data.length, 0);
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
      const group = this.rightData.find(group => group.id === key);
      const option = group?.data.find(data => data.value === id);
      if (group && option) {
        option.disabled = true;
        group.disabled = group.data.every(data => data.disabled);
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
      const group = this.rightData.find(group => group.id === key);
      const option = group?.data.find(data => data.value === id);
      if (group && option) {
        option.disabled = false;
        group.disabled = group.data.every(data => data.disabled);
      }
      this.formValueSetter()

    }
  }

  rightSearch() {
    if (!this.grouped) {
    if (this.rightSearchTerm === '') {
      this.rightData = [...this.initialRightData];
      this.rightSearchLength = this.initialRightData.length
    }
    else {
      if (this.props.fuzzy) {
        const searchResults = this.fuse.search(this.rightSearchTerm);

        this.rightData = searchResults.map(result => result.item);

        this.rightSearchLength = this.rightData.length
      } else {
        const lowerCaseSearchQuery = this.rightSearchTerm.toLowerCase();
        let val = this.initialRightData.filter(course => course.label.toLowerCase().includes(lowerCaseSearchQuery));
        this.rightData = val
        this.rightSearchLength = this.rightData.length
      }
      this.cdr.detectChanges()
    }}


    else{
      if (this.rightSearchTerm === '') {
        this.rightData = [...this.initialRightData];
        this.rightSearchLength = this.rightData.reduce((total, group) => {
          return total + group.data.filter(dataItem => dataItem.visible).length;
        }, 0);
      }
      else {
        if (this.rightSearchTerm === '') {
          this.rightData = [...this.initialRightData];
          this.rightSearchLength = this.initialRightData.length
        }
        const searchTerm = this.rightSearchTerm.toLowerCase();
        this.rightData = this.rightData.map(group => {
          const keyMatches = group.key.toLowerCase().includes(searchTerm);
          const filteredData = group.data.map(dataItem => {
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

        this.rightSearchLength = this.rightData.reduce((total, group) => {
          return total + group.data.filter(dataItem => dataItem.visible).length;
        }, 0);
        this.cdr.detectChanges()
      }
      }
  }


  leftSearch() {
    if (this.leftSearchTerm === '') {
      this.leftData = [...this.initialLeftData];
      this.leftSearchLength = this.initialLeftData.length
    } else {


      if (this.props.fuzzy) {
        const searchResults = this.fuseLeft.search(this.leftSearchTerm);
        this.leftData = searchResults.map(result => result.item);

        this.leftSearchLength = this.leftData.length
        this.rightLength = this.rightData.length;
      } else {
        const lowerCaseSearchQuery = this.leftSearchTerm.toLowerCase();
        let val = this.initialLeftData.filter(course => course.label.toLowerCase().includes(lowerCaseSearchQuery));
        this.leftData = val
        this.leftSearchLength = this.leftData.length
      }
    }

  }


  shiftAllFromRightToLeft() {
    if (!this.grouped) {
      const allIds: number[] = this.rightData.map(course => course.id);
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
    this.rightData.forEach(group => {
      group.data.forEach(dataItem => {
        if (dataItem.visible) {
          dataItem.disabled = true;
        }
      });

      // Update the 'disabled' property of the group based on visible items
      group.disabled = group.data.every(dataItem => dataItem.visible && dataItem.disabled);
    });
  }

  shiftAllFromLeftToRight() {
    let updatedIds = this.formControl.value;

    if (this.leftData) {
      const allIds: number[] = this.leftData.map(course => course.id);

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


  private leftDataGenerator(value) {
    this.props.dataList.subscribe((item) => {
      this.rightData = item.map((item) => ({
        id: item[this.props.valueProp],
        label: item[this.props.labelProp],
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


  private leftGroupDataGenerator(value) {
    value.forEach((group) => {
      const matchingGroup = this.rightData.find((rightGroup) => rightGroup.id === group.key);

      if (matchingGroup) {
        group.data.forEach((dataId) => {
          const matchingData = matchingGroup.data.find((dataItem) => dataItem.value === dataId);
          if (matchingData) {
            matchingData.disabled = true;
          }
        });
        matchingGroup.disabled = matchingGroup.data.every((dataItem) => dataItem.disabled);
      }
    });

    this.leftData= this.rightData
  }
  groupAdd(item) {
    const group = this.rightData.find(dataGroup => dataGroup.id === item);
    if (group) {
      group.disabled = true;
      group.data.forEach(dataItem => (dataItem.disabled = true));
    }
    this.formValueSetter()
  }

  groupRemove(item) {
    const group = this.rightData.find(dataGroup => dataGroup.id === item);
    if (group) {
      group.disabled = false;
      group.data.forEach(dataItem => (dataItem.disabled = false));
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
    const restructuredData = this.rightData.map(item => ({
      key: item.id,
      data: item.data
        .filter(dataItem => dataItem.disabled)
        .map(dataItem => dataItem.value)
    }));
    const allDataEmpty = restructuredData.every(item => item.data.length === 0);
    this.formControl.setValue(allDataEmpty ? [] : restructuredData);
    this.formControl.markAsTouched();
    this.formControl.markAsDirty();
  }

  protected readonly Math = Math;
}
