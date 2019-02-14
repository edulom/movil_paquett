import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-entrega',
  templateUrl: 'entrega.html',
})
export class EntregaPage {
  paquetes:any[];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
                this.paquetes = ['Paquete 1','Paquete 2','Paquete 3','Paquete 4','Paquete 5','Paquete 6','Paquete 7','Paquete 8']
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntregaPage');
  }

}
