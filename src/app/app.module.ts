import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';

import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { EnvironmentsModule } from './../app/environment-variables/environment-variables.module';
import { Facebook } from '@ionic-native/facebook';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { StartTripPage } from '../pages/start-trip/start-trip';

import { AuthProvider } from '../providers/auth/auth';
import { TodosProvider } from '../providers/todos/todos';

import { EmailValidator } from '../validators/email';
import { ImageProvider } from '../providers/image/image';
import { UserProvider } from '../providers/user/user';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';


@NgModule({
  declarations: [
    MyApp,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    EnvironmentsModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true
    }),
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
    EmailValidator,
    Camera,
    File,
    Transfer,
    FilePath,
    ImageProvider,
    UserProvider,
    Crop,
    GoogleMapsProvider
  ]
})
export class AppModule {}
