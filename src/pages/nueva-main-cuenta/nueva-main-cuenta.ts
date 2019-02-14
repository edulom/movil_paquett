import { Component } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { NuevaCuentaPage } from '../index.paginas.log'
@Component({
  selector: 'page-nueva-main-cuenta',
  templateUrl: 'nueva-main-cuenta.html',
})
export class NuevaMainCuentaPage {
  
  rootPageNueCue = NuevaCuentaPage;
  tablet: boolean = false;
  constructor(private platform: Platform,
              public navCtrl: NavController, 
              public navParams: NavParams,
              private screenOrientation: ScreenOrientation) {
    if (!this.platform.is("cordova")) {
      if (this.screenOrientation.type == "landscape-primary") {
        this.tablet = true;
      } else {
        this.tablet = false;
      }
    }
  }


}
