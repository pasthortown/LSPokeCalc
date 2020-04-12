import { MovementModule } from './movement.module';

describe('MovementModule', () => {
   let blackPageModule: MovementModule;

   beforeEach(() => {
      blackPageModule = new MovementModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});