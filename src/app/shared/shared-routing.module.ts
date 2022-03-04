import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetalhesDialogComponent } from './components/detalhes-dialog/detalhes-dialog.component';

const routes: Routes = [
  { path:'', component: DetalhesDialogComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
