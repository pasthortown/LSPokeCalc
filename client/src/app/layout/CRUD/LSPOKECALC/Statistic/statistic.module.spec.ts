import { StatisticModule } from './statistic.module';

describe('StatisticModule', () => {
   let blackPageModule: StatisticModule;

   beforeEach(() => {
      blackPageModule = new StatisticModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});