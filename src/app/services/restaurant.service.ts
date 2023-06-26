import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Restaurant } from '../model/restaurant';
import { Observable } from 'rxjs';
import { MenuItem } from '../model/menu-item';
import { strings } from '@material/radio';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  apiUrl: string = "http://localhost:9080";
  headers:any;
  constructor(private http: HttpClient) { 
    // this.headers = new HttpHeaders({Authorization: 'Basic '+sessionStorage.getItem("headers")});
    // console.log(this.headers);
  }  
  
  public getHeader(headers:HttpHeaders): void {
    this.headers=headers;
    // this.headers = new HttpHeaders({Authorization: 'Basic '+sessionStorage.getItem("headers")});
    console.log(this.headers);
  }

  public removeHeader(): void {
    this.headers = new HttpHeaders();
    console.log(this.headers);
  }

  public getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/restaurants`)
  }

  public getRestaurantsByOwnerId(id:string): Observable<Restaurant[]> {
      return this.http.get<Restaurant[]>(`${this.apiUrl}/restaurants/owner/${id}`)
    }

  public getRestaurantById(id:string|null): Observable<Restaurant> {
    return this.http.get<Restaurant>(this.apiUrl+"/restaurants/"+id)
  }

  public getItemById(id:string|null): Observable<MenuItem> {
    return this.http.get<MenuItem>(this.apiUrl+"/items/"+id)
  }

  public getMenuByRestaurantId(id:string|null): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.apiUrl}/${id}/items`)
  }

  public deleteRestaurant(id : number){
    return this.http.delete(`${this.apiUrl}/restaurants/${id}`, { headers: this.headers, responseType: 'text'});
  }
  
  public deleteItem(id : number) {
    return this.http.delete(`${this.apiUrl}/items/${id}`, { headers: this.headers, responseType: 'text'});
  }
  
  public postItem(item:MenuItem) { 
    return this.http.post(this.apiUrl+"/items", item, { headers: this.headers});
  }

  public updateItem(item:MenuItem) {
    return this.http.put(this.apiUrl+"/items", item, { headers: this.headers});
  }
  
  public postRestaurant(restaurant: Restaurant) {
    return this.http.post(this.apiUrl+"/restaurants", restaurant, { headers: this.headers});
  }
  public updateRestaurant(restaurant: Restaurant) {
    return this.http.put(this.apiUrl+"/restaurants", restaurant, { headers: this.headers});
  }
  
  public postFile(file: any,type:string) {
    return this.http.post(this.apiUrl+"/upload/"+type, file, { headers: this.headers, responseType: 'text'});
  }
  
}
