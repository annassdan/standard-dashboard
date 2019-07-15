import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TheDashboardComponent} from './ideas/the-dashboard/the-dashboard.component';


const routes: Routes = [
  // {
  //   path: '',
  //   component: TheDashboardComponent
  // },
  // {
  //   path: 'at',
  //   loadChildren: () => import('./ideas/master/alat-tangkap/alat-tangkap.module').then(m => m.AlatTangkapModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
