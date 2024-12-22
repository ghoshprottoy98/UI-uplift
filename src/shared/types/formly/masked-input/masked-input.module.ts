import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { MaskedInputComponent } from './masked-input';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

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
    // Add directives and pipes as needed
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask() // Provides necessary configurations for NgxMask
  ]
})
export class MaskedInputModule {}
