import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremierLeagueContainerComponent } from './premier-league-container.component';

describe('PremierLeagueContainerComponent', () => {
  let component: PremierLeagueContainerComponent;
  let fixture: ComponentFixture<PremierLeagueContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PremierLeagueContainerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremierLeagueContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
