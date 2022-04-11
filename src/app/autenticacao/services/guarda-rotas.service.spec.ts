import { TestBed } from '@angular/core/testing';

import { GuardaRotasService } from './guarda-rotas.service';

describe('GuardaRotasService', () => {
  let service: GuardaRotasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardaRotasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
