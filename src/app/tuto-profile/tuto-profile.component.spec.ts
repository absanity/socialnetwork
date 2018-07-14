import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoProfileComponent } from './tuto-profile.component';

describe('TutoProfileComponent', () => {
  let component: TutoProfileComponent;
  let fixture: ComponentFixture<TutoProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutoProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutoProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
