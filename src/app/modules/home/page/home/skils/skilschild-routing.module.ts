import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkilsComponent } from './skils.component';

const routes: Routes = [
  { path: '', component: SkilsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkilschildRoutingModule { }
