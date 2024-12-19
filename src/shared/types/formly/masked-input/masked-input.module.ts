import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {MaskedInputComponent} from './masked-input';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import {MatInputModule} from '@angular/material/input';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
    declarations: [
        MaskedInputComponent
    ],
    exports: [
        MaskedInputComponent
    ],
    imports: [
        CommonModule,
        MatInputModule,
        ReactiveFormsModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'maskedInput',
                    component: MaskedInputComponent,
                    wrappers: ['form-field'],
                },
            ],
        }),
        NgxMaskModule.forRoot(options),
    ]
})
export class MaskedInputModule {
}
