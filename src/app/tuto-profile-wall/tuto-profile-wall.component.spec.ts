import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoProfileWallComponent } from './tuto-profile-wall.component';

describe('TutoProfileWallComponent', () => {
  let component: TutoProfileWallComponent;
  let fixture: ComponentFixture<TutoProfileWallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutoProfileWallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutoProfileWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
