import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PokemonTypeRoutingModule } from './pokemontype-routing.module';
import { PokemonTypeComponent } from './pokemontype.component';
import { PokemonTypeService } from './../../../../services/CRUD/LSPOKECALC/pokemontype.service';
import { environment } from 'src/environments/environment';

@NgModule({
   imports: [CommonModule,
             PokemonTypeRoutingModule,
             FormsModule],
   declarations: [PokemonTypeComponent],
   providers: [
               NgbModal,
               PokemonTypeService
               ]
})
export class PokemonTypeModule {}