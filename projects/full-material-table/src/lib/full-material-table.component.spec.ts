import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullMaterialTableComponent } from './full-material-table.component';

describe('FullMaterialTableComponent', () => {
  let component: FullMaterialTableComponent;
  let fixture: ComponentFixture<FullMaterialTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullMaterialTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullMaterialTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
