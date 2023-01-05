import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, AfterViewInit, ContentChild, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { takeUntil } from 'rxjs';
import { FullMaterialTableService } from './full-material-table.service';
import { Unsub } from './Unsubscription';

interface EscribaniaTableColumn {
  name:string;
  show:boolean;
}

@Component({
  selector: 'lib-fullMaterialTable',
  template: `
    <div id="overlay" (click)="closeOverlay()" [ngClass]="{'d-none': !editColumns}"></div>
    <div class="mat-elevation-z8 border-top-left-radius">
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8 border-top-left-radius" matSort >
        <ng-container [matColumnDef]="column.name" *ngFor="let column of columns"  class="tr-header">
            <ng-container *ngIf="column.name != 'actions'">
                <th mat-header-cell mat-sort-header *matHeaderCellDef > {{column.name}} </th>
                <td mat-cell *matCellDef="let element" > {{element[column.name]}} </td>
            </ng-container>
            <ng-container *ngIf="column.name == 'actions'">
                <th mat-header-cell *matHeaderCellDef class="actions-th" > Acciones 
                    <button mat-button color="primary" (click)="showOverlay()">
                        <mat-icon>edit</mat-icon>
                    </button>
                    <div id="edit-columns" *ngIf="editColumns">                                           
                        <section class="d-flex flex-column">
                            <ng-container *ngFor="let column of columns">
                                <mat-checkbox 
                                class="column-checkboxes text-white" 
                                *ngIf="column.name != 'actions'" 
                                [checked]="column.show"
                                (click)="addRemoveColumn(column)">{{column.name}}</mat-checkbox>
                            </ng-container>                                                       
                        </section>
                    </div>
                </th>
                <td mat-cell *matCellDef="let element" > 
                    <ng-container
                        *ngIf="actionsTemplateRef"
                        [ngTemplateOutlet]="actionsTemplateRef"
                        [ngTemplateOutletContext]="{$implicit: column}"
                    >
                    </ng-container>                
                </td>
                
            </ng-container>           
        </ng-container>  
    
        <tr mat-header-row *matHeaderRowDef="columnsToDisplay" class="blue-bg"></tr>
        <tr mat-row *matRowDef="let row; columns: columnsToDisplay;" class="tw"></tr>          
        <tr class="mat-row" *matNoDataRow>
            <td class="mat-cell" colspan="4">No se encontraron registros para el filtro " <strong>{{dataSource!.filter}}</strong> "</td>
        </tr>
    </table>

    <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]" aria-label="Seleccionar pagina"></mat-paginator>
</div>

  `,
  styles: [
    `
    .d-none {
      display: none;
    }
    #overlay {
      position: absolute;
      width: 100%;
      height: 100vh;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0,0,0,0.5);
      z-index: 10; 
      cursor: pointer; 
    }
    .mat-row td {    
      padding-left: 20px;
      padding-top: 10px;     
    }
    #edit-columns {
        position: absolute;
        width: 200px;
        z-index: 99;
        height: auto;
        background-color: #fff;  
        right: 6%;
    }
    .actions-th {
        overflow: unset;
        position: relative;
    }
    thead {
        background-color: #ccc;
    }
    .border-top-left-radius {
        border-top-left-radius: 10px;
    }
    .blue-bg {
        background-color: #2699FB;
        color: #fff !important;    
      
    }
    .tw {
        color: #fff;
    }
    `
  ], 
})
export class FullMaterialTableComponent extends Unsub implements OnInit,OnChanges,AfterViewInit {

  @Input('columns') columns?:EscribaniaTableColumn[]; 
  @Input('data') data?: any[];
  @Input('filter') filter: string = '';
  columnsToDisplay?: string[]; 
  editColumns?: boolean;
  dataSource!: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ContentChild('actions',{static: false}) actionsTemplateRef?: TemplateRef<any>;

  constructor(
    private fullMaterialTableService:FullMaterialTableService
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {      
   
    if (changes['columns']) {
      this.columns = changes['columns'].currentValue;
    }     

    if (changes['data']) {
      if (changes['data'].isFirstChange()) {
        this.checkColumns();         
        this.dataSource = new MatTableDataSource(changes['data'].currentValue);
      }  else {
        this.dataSource.data = changes['data'].currentValue;
      }
    } 

    if (changes['filter']) {      
      this.dataSource.filter = changes['filter'].currentValue;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {  
   this.columns?.push({name: 'actions' , show: true});
   this.checkColumns();   
   this.subscribeOverlay();
  }
  
  checkColumns(): void {
    this.columnsToDisplay = [];
    if (this.columns) {
      for (const column of this.columns) {
        if (column.show) {
          this.columnsToDisplay?.push(column.name)
        }          
      } 
    }     
  }

  subscribeOverlay(): void {
    this.fullMaterialTableService
    .overlay$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((overlay) => {       
      this.editColumns = overlay;
    })
  }

  addRemoveColumn(columnToModify:EscribaniaTableColumn): void {     
    
    if (columnToModify.show) {
      //filter from columns to display
      this.columnsToDisplay = this.columnsToDisplay?.filter((column => {
        return column != columnToModify.name
      }));      

    } else {
      //add to columns from the start
      this.columnsToDisplay?.unshift(columnToModify.name)      
    }

    //modify state in array of columns
    this.columns?.map(  column => {
      if(column == columnToModify) {
        column.show = !columnToModify.show;
      }
    });  
   
  } 

  showOverlay(): void {
    this.editColumns = true;
    this.fullMaterialTableService.showOverlay();
  }

  closeOverlay(): void {
    this.editColumns = false;
    this.fullMaterialTableService.hideOverlay();
  }
}
