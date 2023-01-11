# FullMaterialTable

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.0.

## How to Use

###### Step 1 - Install

You should run ** npm i full-material-table **

###### Step 2 - Import Corresponding Module
```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { FullMaterialTableModule } from 'full-material-table';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FullMaterialTableModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


###### Step 3 - Use component 

```
 <full-material-table
  [data]="rows"
  [columns]="columns"
  [filter]="''">

    <ng-template let-row #actions>
      <div class="d-flex justify-content-start align-items-center actions-td">
        <button mat-mini-fab color="primary" (click)="getRowData(row)">
          <mat-icon>edit</mat-icon>
        </button>        
      </div>
    </ng-template>
  </full-material-table>
```


## @Inputs 

** data ** : Here you should pass the corresponding rows to the table
** columns ** : Here you should pass the corresponding columns to the table
** filter ** : Here you should pass the corresponding filter to the table
** inside content ** : Here you should pass the corresponding dynamic content for the actions column
