import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-soporte',
  templateUrl: 'soporte.html',
})
export class SoportePage {
  nots:any[];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
                this.nots = [
                            {
                              title: 'Q: Como enviar un paquete?',
                              status: false,
                              desc: 'Descripción'
                            },
                            {
                              title: 'Q: Como seguir tu pedido?',
                              status: false,
                              desc: 'Descripción'
                            },
                            {
                              title: 'Q: Como instalar la APP?',
                              status: false,
                              desc: 'Descripción'
                            },
                            {
                              title: 'Q: Como obtener .......?',
                              status: true,
                              desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. I"
                            }]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SoportePage');
  }

}
