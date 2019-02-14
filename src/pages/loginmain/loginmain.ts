import { Component } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
@Component({
  selector: 'page-loginmain',
  templateUrl: 'loginmain.html',
})
export class LoginmainPage {
  
  tablet:boolean = false;
  constructor(private platform: Platform,
              public navCtrl: NavController, 
              public navParams: NavParams,
              private screenOrientation: ScreenOrientation) {
    if (!this.platform.is("cordova")) {
      if (this.screenOrientation.type == "landscape-primary")
      {
        this.tablet = true;
      }else {
        this.tablet = false;
      }
    }
  }

}
