import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = "http://localhost:8081/"

  constructor(private http: HttpClient) { }

  post(path: string, data: any) {
    const headers = { 'Content-type': 'application/json' };

    return this.http.post(this.baseUrl + path, data, { 'headers': headers })
  }

  postdata(path: string, data: any) {
    return this.http.post(this.baseUrl + path, data)
  }

  

 
}
