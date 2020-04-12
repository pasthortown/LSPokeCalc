import { AbilityModule } from './ability.module';

describe('AbilityModule', () => {
   let blackPageModule: AbilityModule;

   beforeEach(() => {
      blackPageModule = new AbilityModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});