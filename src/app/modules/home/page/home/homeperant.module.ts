import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeperantRoutingModule } from './homeperant-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './home.component';
import { SkilsComponent } from './skils/skils.component';
import { ProjectsComponent } from './projects/projects.component';
import { ServicesHomeComponent } from './services-home/services-home.component';
import { Routes } from '@angular/router';
import { AboutuschildModule } from '../aboutus/aboutuschild.module';
import { ContactuschildModule } from '../contactus/contactuschild.module';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [HomeComponent,SkilsComponent,ProjectsComponent,ServicesHomeComponent],
  imports: [
    CommonModule,
    HomeperantRoutingModule,
    SharedModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    AboutuschildModule,
    ContactuschildModule
  ]
})
export class HomeperantModule { }
