import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { FeaturesModule } from './modules/features/features.module';
import { HomeModule } from './modules/home/home.module';
import { OnBoardingModule } from './modules/onboarding/onboarding.module';
import { UserServiceModule } from './modules/user-services/user-services.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from './core/interceptors/interceptors/http-interceptor';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    OnBoardingModule,
    FeaturesModule,
    UserServiceModule,
    HomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar:true,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    SharedModule
  ],
  providers: [   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
