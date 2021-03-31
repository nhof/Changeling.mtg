import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AngularMaterialModule} from './angular-material.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { ErrorComponent } from './error/error.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import  { ErrorInterceptor} from './error-interceptor'
import { PostsModule } from './posts/posts.module';
import {SidenavComponent} from './sidenav/sidenav.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    PostsModule
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
