import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbilityComponent } from './ability.component';

const routes: Routes = [
   {
      path: '',
      component: AbilityComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class AbilityRoutingModule {}
