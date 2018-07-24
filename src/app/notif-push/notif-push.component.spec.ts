import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifPushComponent } from './notif-push.component';

describe('NotifPushComponent', () => {
  let component: NotifPushComponent;
  let fixture: ComponentFixture<NotifPushComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifPushComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifPushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
