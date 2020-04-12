import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdvantageRoutingModule } from './advantage-routing.module';
import { AdvantageComponent } from './advantage.component';
import { AdvantageService } from './../../../../services/CRUD/LSPOKECALC/advantage.service';
import { environment } from 'src/environments/environment';

@NgModule({
   imports: [CommonModule,
             AdvantageRoutingModule,
             FormsModule],
   declarations: [AdvantageComponent],
   providers: [
               NgbModal,
               AdvantageService
               ]
})
export class AdvantageModule {}