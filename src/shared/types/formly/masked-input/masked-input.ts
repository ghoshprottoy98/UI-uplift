import {Component} from '@angular/core';
import {FieldType} from '@ngx-formly/material/form-field';
import {initialConfig} from 'ngx-mask';
import {FieldTypeConfig} from "@ngx-formly/core";

@Component({
    selector: 'app-masked-input',
    template: `
            <input
                    matInput
                    [type]="props.type!"
                    [formControl]="formControl"
                    [formlyAttributes]="field"
                    [readonly]="props.readonly"
                    [thousandSeparator]="props['thousandSeparator']"
                    [dropSpecialCharacters]="props['dropSpecialCharacters']"
                    [showMaskTyped]="props['showMaskTyped']"
                    [clearIfNotMatch]="props['clearIfNotMatch']"
                    [hiddenInput]="props['hiddenInput']"
                    [decimalMarker]="props['decimalMarker']"
                    [specialCharacters]="props['specialCharacters']"
                    [separatorLimit]= "props['separatorLimit']"
                    [patterns]="props['customPattern']"
                    [prefix]="props['prefix']"
                    [allowNegativeNumbers]="props['allowNegativeNumbers']"
                    [suffix]="props['suffix']"
                    [mask]="props['mask']">
 `,
})
export class MaskedInputComponent extends FieldType<FieldTypeConfig>{
    override defaultOptions = {
        props: {
            type: 'input',
            thousandSeparator: ',',
            dropSpecialCharacters: true,
            showMaskTyped: false,
            clearIfNotMatch: false,
            hiddenInput: false,
            decimalMarker: initialConfig.decimalMarker,
            specialCharacters: initialConfig.specialCharacters,
            prefix: '',
            suffix: '',
            allowNegativeNumbers: false
        },
    };
}
