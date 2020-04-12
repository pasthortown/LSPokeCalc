import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MovementRoutingModule } from './movement-routing.module';
import { MovementComponent } from './movement.component';
import { MovementService } from './../../../../services/CRUD/LSPOKECALC/movement.service';
import { environment } from 'src/environments/environment';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
   imports: [CommonModule,
             MovementRoutingModule,
             CKEditorModule,
             FormsModule],
   declarations: [MovementComponent],
   providers: [
               NgbModal,
               MovementService
               ]
})
export class MovementModule {}