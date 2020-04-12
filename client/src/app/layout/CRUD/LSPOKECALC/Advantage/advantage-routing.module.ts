import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvantageComponent } from './advantage.component';

const routes: Routes = [
   {
      path: '',
      component: AdvantageComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class AdvantageRoutingModule {}
