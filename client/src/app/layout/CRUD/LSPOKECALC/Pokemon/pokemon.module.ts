import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonComponent } from './pokemon.component';
import { PokemonService } from './../../../../services/CRUD/LSPOKECALC/pokemon.service';
import { environment } from 'src/environments/environment';
import { UserService } from './../../../../services/profile/user.service';
import { PokemonTypeService } from './../../../../services/CRUD/LSPOKECALC/pokemontype.service';
import { StatisticService } from './../../../../services/CRUD/LSPOKECALC/statistic.service';
import { NatureService } from './../../../../services/CRUD/LSPOKECALC/nature.service';
import { AbilityService } from './../../../../services/CRUD/LSPOKECALC/ability.service';
import { MovementService } from './../../../../services/CRUD/LSPOKECALC/movement.service';

@NgModule({
   imports: [CommonModule,
             PokemonRoutingModule,
             FormsModule],
   declarations: [PokemonComponent],
   providers: [
               NgbModal,
               UserService,
               PokemonTypeService,
               StatisticService,
               NatureService,
               AbilityService,
               MovementService,
               PokemonService
               ]
})
export class PokemonModule {}