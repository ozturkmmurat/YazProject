import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './admin-layout/navbar/navbar.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './core/helpers/auth/auth.interceptor';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PagesModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
  })
  ],
  providers: [
    {     provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
