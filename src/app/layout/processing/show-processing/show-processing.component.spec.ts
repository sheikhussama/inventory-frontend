import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProcessingComponent } from './show-processing.component';

describe('ShowProcessingComponent', () => {
  let component: ShowProcessingComponent;
  let fixture: ComponentFixture<ShowProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
