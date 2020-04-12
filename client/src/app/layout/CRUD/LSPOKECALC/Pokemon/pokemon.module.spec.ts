import { PokemonModule } from './pokemon.module';

describe('PokemonModule', () => {
   let blackPageModule: PokemonModule;

   beforeEach(() => {
      blackPageModule = new PokemonModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});