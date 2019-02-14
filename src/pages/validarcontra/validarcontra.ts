import { Component } from '@angular/core';
import { NavController, Events, AlertController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../providers/index.services'

@Component({
  selector: 'page-validarcontra',
  templateUrl: 'validarcontra.html',
})
export class ValidarcontraPage {
  verifPassword:string;
  correo:string;
  token:string;
  constructor(public navCtrl: NavController,
              public events: Events, 
              public navParams: NavParams,
              private _us: UsuarioService,
              private alertCtrl: AlertController) {
    this.correo = navParams.get('usuario');

    this.token = navParams.get('token');
  }

  validar() {
    this._us.validarContra(this.token,this.correo,this.verifPassword);
    this.events.subscribe('verifPass:val', (estado, mensaje) => {

      // user and time are the same arguments passed in `events.publish(user, time)`
      if (estado) {
        this.events.publish('Log:val', true);
        this.navCtrl.pop();
      } else {
        this.alertCtrl.create({
          title: "Error",
          message: mensaje,
          buttons: ["OK"]
        }).present();
      }
      this.events.unsubscribe('verifPass:val', null)
    });
  }

}
