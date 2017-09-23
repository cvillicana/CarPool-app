import { Component } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';
import { ImageProvider } from '../../providers/image/image';

import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public user: any;
  public profileImage: any;
  public profileForm: any;
  public submitAttempt: boolean;

  constructor(
    public app: App,
    public navCtrl: NavController,
    public authService: AuthProvider,
    public imageService: ImageProvider,
    private formBuilder: FormBuilder,
    public userService: UserProvider) {
        this.profileImage = "assets/images/profilepicture.png";

        this.profileForm = formBuilder.group({
          name: formBuilder.group({
            firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])]
          })
        });

    }

  ionViewWillEnter(){
    this.userService.getMyUser().then((res) => {

      this.user = res;

      this.profileImage = this.user.picture;

      (<FormGroup>this.profileForm.controls['name'].controls['firstName'])
        .setValue(this.user.name.firstName, {onlySelf: true});

      (<FormGroup>this.profileForm.controls['name'].controls['lastName'])
        .setValue(this.user.name.lastName, {onlySelf: true});

    }, (err) => {

    })
  }

  save(model: User, isValid:boolean){
    if(!isValid){
      return;
    }

    this.submitAttempt = true;

    this.userService.updateUser(model).then((result) => {
      console.log(result);
    }, (err) => {
    //  this.loading.dismiss();
    })

  }

  takePicture(){
    this.imageService.presentActionSheet().then((img) => {
      this.userService.uploadImage(img);
      this.profileImage = img;
    });
  }

  logOut(){
    this.authService.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }

}
