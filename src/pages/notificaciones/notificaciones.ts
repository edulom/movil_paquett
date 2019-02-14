import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-notificaciones',
  templateUrl: 'notificaciones.html',
})
export class NotificacionesPage {
  nots:any[];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
                this.nots = ['Notificacion 1','Notificacion 2','Notificacion 3','Notificacion 4','Notificacion 5','Notificacion 6','Notificacion 7','Notificacion 8']
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificacionesPage');
  }

}
