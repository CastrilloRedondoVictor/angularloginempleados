import { TestBed } from '@angular/core/testing';

import { EmpleadosaxiosService } from './empleadosaxios.service';

describe('EmpleadosaxiosService', () => {
  let service: EmpleadosaxiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadosaxiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
