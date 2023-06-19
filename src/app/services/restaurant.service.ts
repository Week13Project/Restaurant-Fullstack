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
  headers:any;
  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({Authorization: 'Basic '+sessionStorage.getItem("headers")});
  }

  public getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/restaurants`)
  }

  public getMenuByRestaurantId(id:string|null): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.apiUrl}/${id}/items`)
  }

  public deleteRestaurant(id : number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/restaurants/${id}`);
  }
  
  public postItem(item:MenuItem) {
    console.log(this.headers);
    
    return this.http.post(this.apiUrl+"/items", item, { headers: this.headers});
  }
}
