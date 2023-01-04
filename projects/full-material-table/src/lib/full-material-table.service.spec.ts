import { TestBed } from '@angular/core/testing';

import { FullMaterialTableService } from './full-material-table.service';

describe('FullMaterialTableService', () => {
  let service: FullMaterialTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullMaterialTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
