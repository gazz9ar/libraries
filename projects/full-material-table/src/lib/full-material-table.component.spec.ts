import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullMaterialTableComponent } from './full-material-table.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FullMaterialTableService } from './full-material-table.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FullMaterialTableComponent', () => {
  let component: FullMaterialTableComponent;
  let fixture: ComponentFixture<FullMaterialTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        FullMaterialTableComponent 
      ],
      imports: [
        CommonModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      providers: [
        FullMaterialTableService
      ]
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
