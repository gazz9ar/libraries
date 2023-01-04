import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FullMaterialTableService {

  private overlaySubject:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public overlay$:Observable<boolean> = this.overlaySubject.asObservable();

  constructor() { }

  showOverlay(): void {
    this.overlaySubject.next(true);
  }

  hideOverlay(): void {
    this.overlaySubject.next(false);
  }
}
