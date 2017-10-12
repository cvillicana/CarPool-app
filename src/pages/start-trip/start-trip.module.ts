import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StartTripPage } from './start-trip';
import { GoogleAutocompleteModule } from '../../components/google-autocomplete/google-autocomplete.module';

@NgModule({
  declarations: [
    StartTripPage,
  ],
  imports: [
    GoogleAutocompleteModule,
    IonicPageModule.forChild(StartTripPage),
  ],
})
export class StartTripPageModule {}
