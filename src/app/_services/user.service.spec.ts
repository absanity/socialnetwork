import { TestBed, inject } from '@angular/core/testing';

import { User.Service } from './user.service';

describe('User.SService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [User.Service]
    });
  });

  it('should be created', inject([User.Service], (service: User.Service) => {
    expect(service).toBeTruthy();
  }));
});
