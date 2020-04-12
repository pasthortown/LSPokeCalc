import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StatisticRoutingModule } from './statistic-routing.module';
import { StatisticComponent } from './statistic.component';
import { StatisticService } from './../../../../services/CRUD/LSPOKECALC/statistic.service';
import { environment } from 'src/environments/environment';
import { StatisticTypeService } from './../../../../services/CRUD/LSPOKECALC/statistictype.service';

@NgModule({
   imports: [CommonModule,
             StatisticRoutingModule,
             FormsModule],
   declarations: [StatisticComponent],
   providers: [
               NgbModal,
               StatisticTypeService,
               StatisticService
               ]
})
export class StatisticModule {}