import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    sidebar:boolean = true;
    constructor(private http: HttpClient) { }

  post(path: string, data: any){
    return this.http.post<any>(`${environment.url_api}${path}`, data).pipe( map( d => d));
  }

  get(path: string){
    return this.http.get<any>(`${environment.url_api}${path}`).pipe(map (d => d));
  }

  delete(path: string){
    return this.http.delete<any>(`${environment.url_api}${path}`).pipe(map(d => d));
  }

  put(path: string, data: any){
    return this.http.put<any>(`${environment.url_api}${path}`, data).pipe(map (d => d));
  }
}
