import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticTypeComponent } from './statistictype.component';

const routes: Routes = [
   {
      path: '',
      component: StatisticTypeComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class StatisticTypeRoutingModule {}
