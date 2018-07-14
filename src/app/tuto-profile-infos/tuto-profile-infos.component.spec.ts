import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoProfileInfosComponent } from './tuto-profile-infos.component';

describe('TutoProfileInfosComponent', () => {
  let component: TutoProfileInfosComponent;
  let fixture: ComponentFixture<TutoProfileInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutoProfileInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutoProfileInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
