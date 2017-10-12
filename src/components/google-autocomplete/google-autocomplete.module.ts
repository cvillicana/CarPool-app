import { NgModule } from '@angular/core';
import { GoogleAutocompleteComponent } from './google-autocomplete';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [GoogleAutocompleteComponent],
	imports: [ IonicModule ],
	exports: [GoogleAutocompleteComponent]
})
export class GoogleAutocompleteModule {}
