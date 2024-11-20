import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawFdComponent } from './withdraw-fd.component';

describe('WithdrawFdComponent', () => {
  let component: WithdrawFdComponent;
  let fixture: ComponentFixture<WithdrawFdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WithdrawFdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawFdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
