import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoMembersComponent } from './tuto-members.component';

describe('TutoMembersComponent', () => {
  let component: TutoMembersComponent;
  let fixture: ComponentFixture<TutoMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutoMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutoMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
