import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Events  } from 'ionic-angular';
import { UsuarioService } from '../../providers/index.services'

@Component({
  selector: 'page-validar-cuenta',
  templateUrl: 'validar-cuenta.html',
})
export class ValidarCuentaPage {
  correo: string = '';
  verifPassword: string = '';
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              public events: Events,
              private _us: UsuarioService) {
    this.correo = navParams.get('correo');
  }

  reenviar() {
    this._us.reenviarCorreo(this.correo);
    const loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 2000
    });
    loader.present();

    this.events.subscribe('mail:send', (sendMail, error) => {
      loader.dismiss();
      if (sendMail) {
        this.alertCtrl.create({
          title: "Código enviado",
          subTitle: "Recibirá en su correo el nuevo código de confirmación",
          buttons: ['Ok']
        }).present();
      } else {
        if (error == "Wait"){
          this.alertCtrl.create({
            title: "Error",
            subTitle: "Espere al menos 5 minutos antes de solicitar otro código",
            buttons: ['Ok']
          }).present();    
        }else{
          this.alertCtrl.create({
            title: "Error",
            subTitle: "Cuenta ya confirmada",
            buttons: ['Ok']
          }).present();
        }
      }
      this.events.unsubscribe('mail:send', null)
    });
  }

  validar() {
    this._us.validar(this.verifPassword,this.correo);
    const loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 2000
    });
    loader.present();

    this.events.subscribe('statusConfi:val', (validado, statusConf) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      loader.dismiss();
      let estadoVal;
      if (validado) {
        this.alertCtrl.create({
          title: "Cuenta Confirmada",
          subTitle: "confirmación exitosa",
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                this.navCtrl.pop();
                estadoVal = true;
                this.events.publish('conf:doit', estadoVal);
              }
            }]
        }).present();
      } else {
        this.alertCtrl.create({
          title: "Error al confirmar la cuenta",
          subTitle: statusConf,
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                estadoVal = false;
                this.events.publish('conf:doit', estadoVal);
              }
            }]
        }).present();
        
      }
      this.events.unsubscribe('statusConfi:val', null)
    });

  }

}
