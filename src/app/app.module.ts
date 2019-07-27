import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpModule, JsonpModule } from '@angular/http';


import { FormsModule }   from '@angular/forms';

/*all services import here*/
import { LocalstorageService } from './services/localstorage.service';
/*ends here ~ all services import here*/

import { ModalModule } from 'ngx-bootstrap';
import { NgxTagsInputModule } from 'ngx-tags-input';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    NgxTagsInputModule,
    ModalModule.forRoot(),

    BrowserAnimationsModule,
    ToastrModule.forRoot({
      'progressBar':true
    }),
    ToastContainerModule
   ],
  providers: [
    LocalstorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
