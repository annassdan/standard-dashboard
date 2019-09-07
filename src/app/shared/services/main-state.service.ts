import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {MyMenu} from '../../ideas/the-dashboard/the-dashboard.component';
import {rightArrowChar} from '../constants';

export interface MenuInfoState {
  currentMenusInstance?: MyMenu[];
  currentMenu: MyMenu;
  breadcrumbPrefixText: string;
}


export const menuInfo = <MenuInfoState> {
  currentMenusInstance: <MyMenu[]> [],
  currentMenu: <MyMenu> {
    name: '',
    displayName: ''
  },
  breadcrumbPrefixText: ''
};

@Injectable({
  providedIn: 'root'
})
export class MainStateService {

  // public readonly rightArrowChar = '→';
  public readonly rightArrowChar =  rightArrowChar;

  /* Mengindikasikan bahwa perubahan ke bentuk yang small size window telah terpenuhi */
  private _asSmallSize: Subject<boolean> = new BehaviorSubject(false);

  private _searching: Subject<boolean> = new BehaviorSubject(false);

  private _breadcrumbAppear: Subject<boolean> = new BehaviorSubject(true);

  private _selectedMenuOptions: Subject<MenuInfoState> = new BehaviorSubject(menuInfo);


  constructor() { }


  get asSmallSize$(): Observable<boolean> {
    return this._asSmallSize.asObservable();
  }


  public smallSizeReached(next: boolean) {
    this._asSmallSize.next(next);
  }


  get selectedMenuOptions$(): Observable<MenuInfoState> {
    return this._selectedMenuOptions.asObservable();
  }

  public menuOptions(value = menuInfo) {
    this._selectedMenuOptions.next(value);
  }


  get searching$(): Observable<boolean> {
    return this._searching.asObservable();
  }

  public search(value: boolean) {
    this._searching.next(value)
  }


  get breadcrumbAppear$(): Observable<boolean> {
    return this._breadcrumbAppear.asObservable();
  }

  public breadcrumbAppearInViewport(value: boolean) {
    this._breadcrumbAppear.next(value);
  }
}
