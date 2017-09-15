import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StartTripPage } from './start-trip';

@NgModule({
  declarations: [
    StartTripPage,
  ],
  imports: [
    IonicPageModule.forChild(StartTripPage),
  ],
})
export class StartTripPageModule {}
