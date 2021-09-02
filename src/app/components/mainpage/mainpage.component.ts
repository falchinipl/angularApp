import { Component, OnInit } from '@angular/core';
import { Utente } from 'src/app/model/Utente';


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  utenteCorrente:Utente;
  checkIfEditOrAdd: Boolean;
  

  constructor(  ) { }

  
  

  ngOnInit() {
   
  }
  
  getCurrentPost(utente:Utente){
    this.utenteCorrente = utente;
 
  }

  checkIfEdit(edit:Boolean){
    this.checkIfEditOrAdd = edit;
    
  }



}
