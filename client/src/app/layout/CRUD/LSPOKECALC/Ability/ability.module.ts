import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbilityRoutingModule } from './ability-routing.module';
import { AbilityComponent } from './ability.component';
import { AbilityService } from './../../../../services/CRUD/LSPOKECALC/ability.service';
import { environment } from 'src/environments/environment';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
   imports: [CommonModule,
             AbilityRoutingModule,
             CKEditorModule,
             FormsModule],
   declarations: [AbilityComponent],
   providers: [
               NgbModal,
               AbilityService
               ]
})
export class AbilityModule {}