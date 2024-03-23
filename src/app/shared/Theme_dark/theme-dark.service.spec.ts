import { TestBed } from '@angular/core/testing';

import { ThemeDarkService } from './theme-dark.service';

describe('ThemeDarkService', () => {
  let service: ThemeDarkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeDarkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
