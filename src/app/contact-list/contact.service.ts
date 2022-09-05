import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  public getContacts(): Observable<any>{
    return this.http.get('https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts');
  }
}
