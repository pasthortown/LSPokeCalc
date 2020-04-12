import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StatisticTypeComponent } from './statistictype.component';

describe('StatisticTypeComponent', () => {
   let component: StatisticTypeComponent;
   let fixture: ComponentFixture<StatisticTypeComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [StatisticTypeComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StatisticTypeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});