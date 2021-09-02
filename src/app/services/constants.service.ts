import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  urlCrudOperations:String = "http://localhost:4200/";
  

  constructor() { }
}
