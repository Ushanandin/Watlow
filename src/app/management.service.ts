import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  private details = new BehaviorSubject(null);
  public drinkDetails = this.details.asObservable();
  private isNavigated: boolean = false;

  constructor(private http: HttpClient) {}

  /** to set the navigation value */
  setNavigated(value: boolean) {
    this.isNavigated = value;
  }

  /** to get the navigation status */
  getNavigated(): boolean {
    return this.isNavigated;
  }

  /** to get the drink list */
  getDrinkList(param: string) {
    return this.http.get(`${ApiEndPoint.drinkList}?s=${param}`);
  }

  /** to save the drink list once accessed */
  setDrinkDetails(data: any) {
    this.details.next(data);
  }
}
export enum ApiEndPoint {
  drinkList = 'https://www.thecocktaildb.com/api/json/v1/1/search.php',
}
