import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoWallListComponent } from './tuto-wall-list.component';

describe('TutoWallListComponent', () => {
  let component: TutoWallListComponent;
  let fixture: ComponentFixture<TutoWallListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutoWallListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutoWallListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
