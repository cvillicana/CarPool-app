import { Component } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { ImageProvider } from '../../providers/image/image';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public backgroundImg: any;

  constructor(
    public app: App,
    public navCtrl: NavController,
    public authService: AuthProvider,
    public imageService: ImageProvider) {
      this.backgroundImg = "assets/images/profilepicture.png";
    }

  takePicture(){
    this.imageService.presentActionSheet().then((img) => {
      this.backgroundImg = img;
    });
  }

  logOut(){
    this.authService.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }

}
