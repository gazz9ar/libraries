import { NgModule } from '@angular/core';
import { FullMaterialTableComponent } from './full-material-table.component';
import { FullMaterialTableService } from './full-material-table.service';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    FullMaterialTableComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,    
  ],
  exports: [
    FullMaterialTableComponent
  ],
  providers: [
    FullMaterialTableService
  ]
})
export class FullMaterialTableModule { }
