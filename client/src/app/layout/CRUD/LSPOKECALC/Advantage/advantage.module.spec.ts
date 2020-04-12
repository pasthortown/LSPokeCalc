import { AdvantageModule } from './advantage.module';

describe('AdvantageModule', () => {
   let blackPageModule: AdvantageModule;

   beforeEach(() => {
      blackPageModule = new AdvantageModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});