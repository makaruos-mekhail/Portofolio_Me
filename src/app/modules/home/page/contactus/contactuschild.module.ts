import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactuschildRoutingModule } from './contactuschild-routing.module';
import { ContactusComponent } from './contactus.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ContactusComponent],
  imports: [
    CommonModule,
    ContactuschildRoutingModule,
    SharedModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    ContactusComponent
  ]
})
export class ContactuschildModule { }
