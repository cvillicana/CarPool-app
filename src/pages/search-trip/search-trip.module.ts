import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchTripPage } from './search-trip';
import { GoogleAutocompleteModule } from '../../components/google-autocomplete/google-autocomplete.module';


@NgModule({
  declarations: [
    SearchTripPage,
  ],
  imports: [
    GoogleAutocompleteModule,
    IonicPageModule.forChild(SearchTripPage),
  ],
})
export class SearchTripPageModule {}
