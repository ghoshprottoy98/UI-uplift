import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {MatInputModule} from "@angular/material/input";
import {InlineSVGModule} from "ng-inline-svg-2";
import {FileTypeComponent} from "./file-type.component";
import {FileInputComponent} from "./file-input.component";

@NgModule({
    declarations: [
        FileTypeComponent, FileInputComponent
    ],
    exports: [
        FileTypeComponent
    ],
    imports: [
        CommonModule,
        MatInputModule,
        ReactiveFormsModule,
        FormlyModule.forRoot({
            types: [{name: 'fileType', component: FileTypeComponent}],
        }),
        InlineSVGModule
    ]
})
export class FileTypeModule {
}
