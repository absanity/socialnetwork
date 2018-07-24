import { TestBed, inject } from '@angular/core/testing';

import { PushNotifService } from './push-notif.service';

describe('PushNotifService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PushNotifService]
    });
  });

  it('should be created', inject([PushNotifService], (service: PushNotifService) => {
    expect(service).toBeTruthy();
  }));
});
