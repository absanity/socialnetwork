import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoInvitationsComponent } from './tuto-invitations.component';

describe('TutoInvitationsComponent', () => {
  let component: TutoInvitationsComponent;
  let fixture: ComponentFixture<TutoInvitationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutoInvitationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutoInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
