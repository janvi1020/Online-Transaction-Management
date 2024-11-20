import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFdComponent } from './create-fd.component';

describe('CreateFdComponent', () => {
  let component: CreateFdComponent;
  let fixture: ComponentFixture<CreateFdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateFdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
