import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  loading: any;
  submitAttemp:any;
  signUpForm:any;

  constructor(
    public navCtrl: NavController,
    public authService:AuthProvider,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public emailValidator: EmailValidator) {

      this.signUpForm = formBuilder.group({
        firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        email: ['', Validators.compose([Validators.maxLength(30), <any>Validators.email, Validators.required]), emailValidator.checkEmail.bind(emailValidator)],
        password: ['']
      });
  }

  register(formData){
    if(!formData.valid){
      return;
    }

    this.submitAttemp = true;

    this.showLoader();

    let details = {
      email: formData.value.email,
      password: formData.value.password,
      name: {
        firstName:formData.value.firstName,
        lastName:formData.value.lastName
      }
    }

    this.authService.createAccount(details).then((result) => {
      this.loading.dismiss();
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
      this.loading.dismiss()
    });

  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
    this.loading.present();
  }
}
