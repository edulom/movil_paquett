import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { LoginmainPage } from '../index.paginas.log'
import { HomePage } from '../index.paginas.root'
import { MyApp } from '../../app/app.component'
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {
  img_1: any = '../../assets/imgs/step_1.png';

  log: boolean = false;
  plataforma: any = '';
  constructor(public navCtrl: NavController, 
              public platform: Platform,
              private main: MyApp) {}

  navegarPagina() {
    if(this.log){
      this.navCtrl.push(HomePage);
      this.main.rootPage = HomePage;
    }
    else{
      this.navCtrl.push(LoginmainPage);
      this.main.rootPage = LoginmainPage;
    }
  }

}
