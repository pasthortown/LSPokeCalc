import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovementComponent } from './movement.component';

const routes: Routes = [
   {
      path: '',
      component: MovementComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class MovementRoutingModule {}
