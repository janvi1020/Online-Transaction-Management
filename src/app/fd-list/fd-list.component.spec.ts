import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdListComponent } from './fd-list.component';

describe('FdListComponent', () => {
  let component: FdListComponent;
  let fixture: ComponentFixture<FdListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FdListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
