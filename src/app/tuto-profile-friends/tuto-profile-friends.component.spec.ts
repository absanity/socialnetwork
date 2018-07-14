import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoProfileFriendsComponent } from './tuto-profile-friends.component';

describe('TutoProfileFriendsComponent', () => {
  let component: TutoProfileFriendsComponent;
  let fixture: ComponentFixture<TutoProfileFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutoProfileFriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutoProfileFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
