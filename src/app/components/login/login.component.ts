import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, TimeoutError } from 'rxjs';

import { LoginService } from 'src/app/services/login-service.service';
import { Router } from '@angular/router';

import { User } from '../../model/User';
import { FeedbackMessage } from 'src/app/model/FeedbackMessage';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output()
  private checkIfCanNavigate:EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Output()
  private sendTokenExpiration:EventEmitter<number> = new EventEmitter<number>();

  /*@Output()
  private exitIfTokenErased:EventEmitter<Boolean> = new EventEmitter<Boolean>();*/

  @Output()
  private sendLoginBooleanValue:EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Output()
  private getServerResponse:EventEmitter<FeedbackMessage> = new EventEmitter<FeedbackMessage>();

  private canNavigate:Boolean;
  private loginForm:FormGroup;
  //private expireTime:number = 5000;
  private timeOut:any;
  public isLogged:Boolean;
  private username:FormControl = new FormControl('',Validators.required);
  private password:FormControl = new FormControl('',Validators.required);

  loginFormShow: String;

  @Input()
  set showLoginForm(str:String){
    this.loginFormShow = str;
    
  }
  
 
  @Input()
  set setShowLogin(navigate:Boolean){
    this.canNavigate = navigate;

    
  }

  constructor(private http:LoginService,private fb:FormBuilder, private router:Router) {
  
    this.loginForm = this.fb.group({
      username:this.username,
      password:this.password
    })
   }



  ngOnInit() {

    
  }

  
  
 
  sendCredentials(user:User){
      user = this.loginForm.value;
    this.http.sendCredentials(user).subscribe(res =>{
      if(this.http.isUserLogged){
     
       
        this.isLogged = true;
        this.sendLoginBooleanValue.emit(this.isLogged);
    
        this.router.navigate(['']);
       }
      this.canNavigate = this.http.isAuthenticated();
      this.sendTokenExpiration.emit(this.timeOut);
      this.checkIfCanNavigate.emit(this.canNavigate);
      this.getServerResponse.emit(new FeedbackMessage(true,"login avvenuto con successo"));
      
    },error =>{
      this.getServerResponse.emit(new FeedbackMessage(false,error));
    })
    this.loginForm.reset();
    
  }

  @Input()
  set logInOut(isLogged:boolean){
    this.isLogged = isLogged;
    
  }
  
  


}
