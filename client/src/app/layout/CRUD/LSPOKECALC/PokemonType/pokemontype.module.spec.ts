import { PokemonTypeModule } from './pokemontype.module';

describe('PokemonTypeModule', () => {
   let blackPageModule: PokemonTypeModule;

   beforeEach(() => {
      blackPageModule = new PokemonTypeModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});