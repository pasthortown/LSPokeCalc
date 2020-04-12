import { StatisticTypeModule } from './statistictype.module';

describe('StatisticTypeModule', () => {
   let blackPageModule: StatisticTypeModule;

   beforeEach(() => {
      blackPageModule = new StatisticTypeModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});