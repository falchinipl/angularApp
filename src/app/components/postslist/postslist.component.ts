
import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ConstantsService } from 'src/app/services/constants.service';
import { HttpService } from 'src/app/services/http-service.service';
import { LoginService } from 'src/app/services/login-service.service';
import{Utente} from '../../model/Utente';

@Component({
  selector: 'postslist',
  templateUrl: './postslist.component.html',
  styleUrls: ['./postslist.component.css']
})
export class PostslistComponent implements OnInit {
 
  utenti:Utente[];
  editPost:Boolean;

  
  @Output()
  private editedRow:EventEmitter<Utente> = new EventEmitter<Utente>();

  @Output()
  private checkIfEditOrInsert:EventEmitter<Boolean> = new EventEmitter<Boolean>();

  constructor(private http:HttpService, private constants:ConstantsService, private login:LoginService) { }
  private url:String = this.constants.urlCrudOperations;
  

  ngOnInit() {
    if(this.login.isAuthenticated()){
       this.getAll();
    }
   
  }

  getAll(){
    this.http.get(this.url + "users").subscribe(res =>{
      this.utenti = res;
      console.log(res);
    }) 
  }

  delete(utente:Utente){
    this.http.delete(utente,this.url + "users/" + utente.id).subscribe(post =>{
     
      this.getAll();
    })
  }

  edit(utente:Utente){
   
    this.editedRow.emit(utente);
 
    this.editPost = true;
    
    this.checkIfEditOrInsert.emit(this.editPost);

  }

@Input()
set setPost(utente:Utente){

  if(utente!=undefined){
    this.getAll();
  }
 
}
  
@Input()
    set editCheck(edit:Boolean){
      this.editPost = edit;
     
    }


}
