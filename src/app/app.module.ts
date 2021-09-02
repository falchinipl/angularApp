import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FakeBackend, fakeBackendProvider } from './helpers/fake-backend';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProdottiComponent } from './components/prodotti/prodotti.component';
import { ContattiComponent } from './components/contatti/contatti.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddformComponent } from './components/addform/addform.component';


import { PostslistComponent } from './components/postslist/postslist.component';
import { LoginComponent } from './components/login/login.component';
import { JwtInterceptorService } from './services/jwt-interceptor-service.service';

import { AuthServiceService } from './services/auth-service.service';



const appRoutes:Routes = [
  {path:'',canActivate: [AuthServiceService], component: MainpageComponent},
  
  {path:'prodotti', component:ProdottiComponent},
  {path:'contatti',component:ContattiComponent},
  {path:'login',component:LoginComponent},
  
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProdottiComponent,
    ContattiComponent,
    MainpageComponent,
    AddformComponent,

    PostslistComponent,

    LoginComponent,



  

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    AuthServiceService,
    fakeBackendProvider
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
