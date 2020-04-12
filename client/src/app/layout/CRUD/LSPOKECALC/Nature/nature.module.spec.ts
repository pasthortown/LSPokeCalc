import { NatureModule } from './nature.module';

describe('NatureModule', () => {
   let blackPageModule: NatureModule;

   beforeEach(() => {
      blackPageModule = new NatureModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});