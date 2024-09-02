import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeGameComponent } from './large-game.component';

describe('LargeGameComponent', () => {
  let component: LargeGameComponent;
  let fixture: ComponentFixture<LargeGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LargeGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LargeGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
