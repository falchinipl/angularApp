import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
;


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public canNavigate:Boolean;
  public expiration: number;
  public isLogged:Boolean;
  public operation:String;
  
  @Output()
  public logOutAtClick:EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Output()
  public logInEvent:EventEmitter<String> = new EventEmitter<String>();

  @Output()
  public registerEvent:EventEmitter<String> = new EventEmitter<String>();

  constructor(private router:Router) { 
    
  }


  ngOnInit() {
    
  }

  @Input()
  set setAuthorizationNavigate(navigate:Boolean){
    this.canNavigate = navigate;
  
    
  }

  @Input()
  set getExpirationTime(n:number){
    this.expiration = n;
    
  }

  removeCredential(){
 
    localStorage.removeItem('currentUserToken');
    this.isLogged = false;
    this.logOutAtClick.emit(this.isLogged);
    clearTimeout(this.expiration);
    this.router.navigate(['/login']);
  }

  SetlogInForm(){
    this.operation = "login";
    this.logInEvent.emit(this.operation);
  }

  SetRegisterForm(){
    this.operation = "register";
    this.registerEvent.emit(this.operation);
  }
   
  @Input()
  set setLogged(logged:Boolean){
    this.isLogged = logged;
  }

}
