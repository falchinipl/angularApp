import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {User} from '../model/User';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';



const tokenUrl = "http://localhost:4200/users/authenticate";
@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private currentUserBehaviour:BehaviorSubject<User>;
  public currentUser:Observable<User>;

  public isUserLogged:Boolean;
  public user:any;
  public tokenUrl:String;
  constructor(private http:HttpClient, private router: Router) { 
    this.currentUserBehaviour = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUserToken')));
    this.currentUser = this.currentUserBehaviour.asObservable();
    this.user = JSON.parse(localStorage.getItem('currentUserToken'));

  }
 

  /*getToken(){
    return this.http.get(tokenUrl);
  }*/

  sendCredentials(u:User){
    return this.http.post<any>(tokenUrl,u).pipe(map(user =>{
      this.user = user;
     
      if(user && user.token){
        localStorage.setItem('currentUserToken',JSON.stringify(user));
        this.isUserLogged = true;
      }
      
    }));
  }

  
  
  isAuthenticated(){
    if(localStorage.getItem('currentUserToken') != null){
      return true;
    }
    this.router.navigate(['']);
    return false;
    
    
  }
  



}
