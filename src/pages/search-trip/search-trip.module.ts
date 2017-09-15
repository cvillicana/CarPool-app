import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchTripPage } from './search-trip';

@NgModule({
  declarations: [
    SearchTripPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchTripPage),
  ],
})
export class SearchTripPageModule {}
