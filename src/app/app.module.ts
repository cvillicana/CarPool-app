import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { EnvironmentsModule } from './../app/environment-variables/environment-variables.module';
import { Facebook } from '@ionic-native/facebook';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';

import { AuthProvider } from '../providers/auth/auth';
import { TodosProvider } from '../providers/todos/todos';

import { EmailValidator } from '../validators/email';

@NgModule({
  declarations: [
    MyApp,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    EnvironmentsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Storage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    TodosProvider,
    Facebook,
    EmailValidator
  ]
})
export class AppModule {}
