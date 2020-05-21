import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainbuttonsComponent } from './mainbuttons.component';

describe('MainbuttonsComponent', () => {
  let component: MainbuttonsComponent;
  let fixture: ComponentFixture<MainbuttonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainbuttonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainbuttonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
