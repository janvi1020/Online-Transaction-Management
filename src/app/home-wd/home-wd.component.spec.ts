import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWdComponent } from './home-wd.component';

describe('HomeWdComponent', () => {
  let component: HomeWdComponent;
  let fixture: ComponentFixture<HomeWdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeWdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeWdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
