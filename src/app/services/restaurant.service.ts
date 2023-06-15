import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Restaurant } from '../model/restaurant';
import { Observable } from 'rxjs';
import { MenuItem } from '../model/menu-item';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  apiUrl: string = "http://localhost:9080";
  constructor(private http: HttpClient) { }

  public getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/restaurants`)
  }

  public getMenuByRestaurantId(id:string|null): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.apiUrl}/${id}/items`)
  }
}
