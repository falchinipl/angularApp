import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {Utente} from '../../model/Utente';
import { HttpService } from 'src/app/services/http-service.service';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConstantsService } from 'src/app/services/constants.service';


@Component({
  selector: 'addform',
  templateUrl: './addform.component.html',
  styleUrls: ['./addform.component.css']
})
export class AddformComponent implements OnInit {
  @Output()
  eventEmitterForUtenteCorrente:EventEmitter<Utente> = new EventEmitter<Utente>();

  @Output()
  checkIfEditOrPost:EventEmitter<Boolean> = new EventEmitter<Boolean>();
  utenteCorrente:Utente;

  postForm: FormGroup;
  checkIfEdit:Boolean;
  
 
  firstname:FormControl = new FormControl('',[Validators.required]);
  lastname:FormControl = new FormControl('');
  fiscalcode:FormControl = new FormControl('');
  private url:String = this.constants.urlCrudOperations;

  constructor(private httpService:HttpService, private fb:FormBuilder,private constants:ConstantsService) { 
    this.postForm = this.fb.group({
       
      firstName:this.firstname,
      lastName:this.lastname,
      fiscalCode: this.fiscalcode

    })
  }

  ngOnInit() {
  }



  save(){
     let utente:Utente = this.postForm.value;
      
      this.httpService.post(utente, this.url + "/users/add").subscribe(res =>{
      
      if(res.id != 0 || res.id != null){
        
        this.utenteCorrente = res;
        this.eventEmitterForUtenteCorrente.emit(this.utenteCorrente);
      }
  
    })
    this.postForm.reset();
  }

  editUser(){
    
    this.checkIfEdit = false;
    this.checkIfEditOrPost.emit(this.checkIfEdit);
    let editUtente:Utente = this.postForm.value;
     editUtente.id = this.utenteCorrente.id;
    this.httpService.put(editUtente,this.url + "/users/modify").subscribe(user=>{
     this.utenteCorrente = user;
      this.eventEmitterForUtenteCorrente.emit(this.utenteCorrente);
      
    })
 
  }


  @Input()
    set editCheck(edit:Boolean){
      this.checkIfEdit = edit;
     
    }
   
  
  
  @Input()
  set setUtente(utente:Utente){
  
    if(utente!=undefined){
      this.utenteCorrente = utente;

      this.firstname.setValue(utente.firstName);
      this.lastname.setValue(utente.lastName);
      this.fiscalcode.setValue(utente.fiscalCode);
    }
   
  }


}
