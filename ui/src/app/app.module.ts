import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { FeaturesModule } from './modules/features/features.module';
import { HomeModule } from './modules/home/home.module';
import { OnBoardingModule } from './modules/onboarding/onboarding.module';
import { UserModule } from './modules/user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from './core/interceptors/interceptors/http-interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    OnBoardingModule,
    FeaturesModule,
    UserModule,
    HomeModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
