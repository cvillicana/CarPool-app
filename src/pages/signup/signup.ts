import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';

import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage{
  loading: any;
  submitAttempt: boolean;
  signUpForm: any;

  constructor(
    public navCtrl: NavController,
    public authService:AuthProvider,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public emailValidator: EmailValidator) {

      this.signUpForm = formBuilder.group({
        name: formBuilder.group({
          firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
          lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])]
        }),
        email: ['', Validators.compose([Validators.maxLength(30), <any>Validators.email, Validators.required]), emailValidator.checkEmail.bind(emailValidator)],
        password: ['']
      });
  }

  register(model: User, isValid: boolean){
    if(!isValid){
      return;
    }

    this.submitAttempt = true;

    this.showLoader();

    this.authService.createAccount(model).then((result) => {
      this.loading.dismiss();
      this.navCtrl.setRoot(TabsPage);
    }, (err) => {
      this.loading.dismiss();
    });

  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
    this.loading.present();
  }
}
