import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card'
import {MatButtonModule} from '@angular/material/button'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatExpansionModule} from '@angular/material/expansion'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PostCreateComponent} from './cards/card-create/card-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './cards/card-list/card-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
