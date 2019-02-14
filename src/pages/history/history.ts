import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  historys:any[];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
                this.historys = [
                                {
                                  des:'Paquete 1',
                                  fecha_recibido: '01/02/2019',
                                  recha_entregado: '10/02/2019'
                                },
                                {
                                  des:'Paquete 2',
                                  fecha_recibido: '02/02/2019',
                                  recha_entregado: '11/02/2019'
                                },
                                {
                                  des:'Paquete 3',
                                  fecha_recibido: '03/02/2019',
                                  recha_entregado: '12/02/2019'
                                },
                                {
                                  des:'Paquete 4',
                                  fecha_recibido: '04/02/2019',
                                  recha_entregado: '13/02/2019'
                                },
                                {
                                  des:'Paquete 5',
                                  fecha_recibido: '05/02/2019',
                                  recha_entregado: '10/02/2019'
                                },
                                {
                                  des:'Paquete 6',
                                  fecha_recibido: '06/02/2019',
                                  recha_entregado: '11/02/2019'
                                },
                                {
                                  des:'Paquete 7',
                                  fecha_recibido: '07/02/2019',
                                  recha_entregado: '12/02/2019'
                                },
                                {
                                  des:'Paquete 8',
                                  fecha_recibido: '08/02/2019',
                                  recha_entregado: '13/02/2019'
                                },
                                {
                                  des:'Paquete 9',
                                  fecha_recibido: '09/02/2019',
                                  recha_entregado: '10/02/2019'
                                },
                                {
                                  des:'Paquete 10',
                                  fecha_recibido: '10/02/2019',
                                  recha_entregado: '13/02/2019'
                                }]
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

}
