import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
    children: [
      {
        path: 'projects', 
        loadChildren: () => import('./projects/projectchild.module').then(m => m.ProjectchildModule)
      },
      {
        path: 'services-home', 
        loadChildren: () => import('./services-home/serviceshomechild.module').then(m => m.ServiceshomechildModule)
      },
      {
        path: 'skils', 
        loadChildren: () => import('./skils/skilschild.module').then(m => m.SkilschildModule)
      },
      {
        path: 'aboutus', 
        loadChildren: () => import('../aboutus/aboutuschild.module').then(m => m.AboutuschildModule)
      },
      {
        path: 'contactus', 
        loadChildren: () => import('../contactus/contactuschild.module').then(m => m.ContactuschildModule)
      }
    ]
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeperantRoutingModule { }
