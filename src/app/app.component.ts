import { Component } from '@angular/core';
import { FeedbackMessage } from './model/FeedbackMessage';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularAppEsercizio';
  public canNavigate:boolean;
  //public expireTime: number;
  public isLogged:Boolean;
  public feedback:FeedbackMessage;
  public showErrorMessage:Boolean;



  ngOnInit(){
   if(localStorage.getItem('currentUserToken') != null){
    this.canNavigate = true;
    this.isLogged = true;
   }
  
   
  }

  /*setExpireTime(n:number){
    this.expireTime = n;
  }*/

  checkIfCanNavigate(x:boolean){
    this.canNavigate = x;
  }

  /*exitIfTokenIsExpired(x:boolean){
    this.canNavigate = x;
  }*/

   logInOut(logOut:boolean){
    this.isLogged = logOut;
    
   }

  getFeedbackFromBackend(feedback:FeedbackMessage){

    if(feedback && feedback.message){
      this.showErrorMessage = feedback.success;
    }
     console.log(this.showErrorMessage) 
    
  }

   

}
