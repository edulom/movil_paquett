import { Component } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { RecibirPage } from '../index.paginas.root'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  rootPageMain: any = RecibirPage;
  tablet:boolean = false;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private platform: Platform) {
    if (this.platform.is('tablet')) {
      this.tablet = true;
    } else if (this.platform.is('phablet')) {
      this.tablet = false;
    } else if (this.platform.is('mobile')) {
      this.tablet = false;
    }
  }

}
