import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './page/home/home.component';
import { ContactusComponent } from './page/contactus/contactus.component';
import { AboutusComponent } from './page/aboutus/aboutus.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SkilsComponent } from './page/home/skils/skils.component';
import { ProjectsComponent } from './page/home/projects/projects.component';


@NgModule({
  declarations: [HomeComponent,ContactusComponent,AboutusComponent, SkilsComponent, ProjectsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    TranslateModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
