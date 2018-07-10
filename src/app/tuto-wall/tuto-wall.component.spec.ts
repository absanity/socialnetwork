import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoWallComponent } from './tuto-wall.component';

describe('TutoWallComponent', () => {
  let component: TutoWallComponent;
  let fixture: ComponentFixture<TutoWallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutoWallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutoWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
