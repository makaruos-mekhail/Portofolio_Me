import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutuschildRoutingModule } from './aboutuschild-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AboutusComponent } from './aboutus.component';

@NgModule({
  declarations: [AboutusComponent],
  imports: [
    CommonModule,
    AboutuschildRoutingModule,
    SharedModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    AboutusComponent
  ]
})
export class AboutuschildModule { }
