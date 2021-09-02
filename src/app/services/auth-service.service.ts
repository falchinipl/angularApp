import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService implements CanActivate{

  constructor(private router: Router,
    private authenticationService: LoginService,private login:LoginService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.user;
   
    if(currentUser && this.login.isAuthenticated()){ 
      
      return true;
    }
    console.log(route);
    this.router.navigate(['/login'],{queryParams: {returnUrl:state.url}});
    return false;
  }
  
}
