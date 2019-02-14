import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events, AlertController } from 'ionic-angular';
import { UsuarioService } from '../../providers/index.services'

@Component({
  selector: 'page-recuperar-pass',
  templateUrl: 'recuperar-pass.html',
})
export class RecuperarPassPage {
  sendMail: boolean = false;
  codSeg: boolean = false;
  email: string;
  password: string;
  codigo: string;

  constructor(public navCtrl: NavController,
              private _us: UsuarioService, 
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              public events: Events,
              public navParams: NavParams) {
  }

  enviar() {
    this._us.recuPass(this.email);
    const loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 2000
    });
    loader.present();

    this.events.subscribe('codSeg:send', (sendMail) => {
      loader.dismiss();
      if (sendMail) {
        this.alertCtrl.create({
          title: "Código enviado",
          subTitle: "Recibirá en su correo el código de seguridad.",
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                this.sendMail = !this.sendMail
              }
            }]
        }).present();
        this.events.unsubscribe('codSeg:send', null)
      } else {
        this.alertCtrl.create({
          title: "Error",
          subTitle: "Verifique su usuario/correo",
          buttons: ['Ok']
        }).present();
        this.events.unsubscribe('codSeg:send', null)
      }
    });   
  }

  validar() {
    this._us.recuPassValidar(this.codigo,this.email);
    const loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 2000
    });
    loader.present();

    this.events.subscribe('passVal:val', (passVal) => {
      loader.dismiss();
      if (passVal) {
        this.codSeg = !this.codSeg
      }
      this.events.unsubscribe('passVal:val', null)
    });
  }

  guardar(){
    let evalPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    if (evalPassword.test(this.password)){

      this._us.guardarPass(this.password, this.email);
      const loader = this.loadingCtrl.create({
        content: "Cargando...",
        duration: 2000
      });
      
      loader.present();
      this.events.unsubscribe('save:val', null)
      this.events.subscribe('save:val', (save, error) => {
        loader.dismiss();
        if (save) {
          this.navCtrl.pop();
        } else if (error == "ContraseñaIncorrecta") {
          this.alertCtrl.create({
            title: "Error",
            subTitle: "Utilice una contraseña diferente de las que haya utilizado menos de 30 dias.",
            buttons: ['Ok']
          }).present();
        }
      });

    }else{
      this.alertCtrl.create({
        title: "Contraseña incorrecta",
        subTitle: "Verifica la Contraseña.",
        buttons: ['Ok']
      }).present();
    }

  }
    

}
