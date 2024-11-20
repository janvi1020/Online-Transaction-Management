import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakFdComponent } from './break-fd.component';

describe('BreakFdComponent', () => {
  let component: BreakFdComponent;
  let fixture: ComponentFixture<BreakFdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreakFdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreakFdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
