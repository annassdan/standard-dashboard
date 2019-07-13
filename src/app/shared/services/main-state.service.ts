import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainStateService {


  /* Mengindikasikan bahwa perubahan ke bentuk yang small size window telah terpenuhi */
  private _asSmallSize: Subject<boolean> = new BehaviorSubject(false);

  constructor() { }


  get asSmallSize$(): Observable<boolean> {
    return this._asSmallSize.asObservable();
  }


  public smallSizeReached(next: boolean) {
    this._asSmallSize.next(next);
  }

}
