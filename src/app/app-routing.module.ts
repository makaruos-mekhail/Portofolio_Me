import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = 
[ 
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:'home', loadChildren: () => import('./modules/home/page/home/homeperant.module').then(m => m.HomeperantModule)},
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {initialNavigation: 'enabledBlocking'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
