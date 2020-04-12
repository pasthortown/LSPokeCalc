import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NatureRoutingModule } from './nature-routing.module';
import { NatureComponent } from './nature.component';
import { NatureService } from './../../../../services/CRUD/LSPOKECALC/nature.service';
import { environment } from 'src/environments/environment';

@NgModule({
   imports: [CommonModule,
             NatureRoutingModule,
             FormsModule],
   declarations: [NatureComponent],
   providers: [
               NgbModal,
               NatureService
               ]
})
export class NatureModule {}