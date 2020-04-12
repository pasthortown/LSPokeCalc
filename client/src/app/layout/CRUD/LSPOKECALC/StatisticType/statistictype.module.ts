import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StatisticTypeRoutingModule } from './statistictype-routing.module';
import { StatisticTypeComponent } from './statistictype.component';
import { StatisticTypeService } from './../../../../services/CRUD/LSPOKECALC/statistictype.service';
import { environment } from 'src/environments/environment';

@NgModule({
   imports: [CommonModule,
             StatisticTypeRoutingModule,
             FormsModule],
   declarations: [StatisticTypeComponent],
   providers: [
               NgbModal,
               StatisticTypeService
               ]
})
export class StatisticTypeModule {}