import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utente } from '../model/Utente';


@Injectable({


  providedIn: 'root'
})


export class HttpService {
  

  constructor(private http:HttpClient) { }

  get(url):Observable<Utente[]>{
    return this.http.get<Utente[]>(url);
  }

  post(utente:any,url){
    return this.http.post<Utente>(url,utente);
  }

  put(utente:Utente,url){
    return this.http.put(url,utente);
  }

  delete(utente:Utente,url){
    return this.http.delete(url );
  }

}
