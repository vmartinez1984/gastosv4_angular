import { TestBed } from '@angular/core/testing';

import { TipoDeAhorroService } from './tipo-de-ahorro.service';

describe('TipoDeAhorroService', () => {
  let service: TipoDeAhorroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoDeAhorroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
