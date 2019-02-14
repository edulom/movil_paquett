import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController, AlertController, ModalController, Events   } from 'ionic-angular';
import { RecuperarPassPage, NuevaMainCuentaPage } from '../index.paginas.log';
import { ToastController } from 'ionic-angular';
import { MyApp } from '../../app/app.component'
import { HomePage } from '../index.paginas.root'
import { UsuarioService } from '../../providers/index.services'

import { ValidarCuentaPage } from '../index.paginas.log'
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  mostrar:boolean = false;
  email:string ='';
  password:string = '';
  error:boolean = false;
  mensaje:string = '';
  token:string = '';
  table:boolean;
  
  constructor(public navCtrl: NavController,
              private toastCtrl: ToastController, 
              public navParams: NavParams,
              private _us: UsuarioService,
              private platform: Platform,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private main: MyApp,
              private modalCtrl: ModalController,
              public events: Events) {
    if (this.platform.is('tablet')) {
      this.table = true;
    } else if (this.platform.is('phablet')) {
      this.table = false;
    } else if (this.platform.is('mobile')) {
      this.table = false;
    }
    
  }

 

  cambiarMostrar(){
    this.mostrar = !this.mostrar;
  }

  inciar(){
    if (this.email == 'demo' && this.password == 'demo') {
      return this.main.rootPage = HomePage;
    }
    console.log("hol")
    this.mensaje = '';
    this.error = false;
    if (!this.email){
      let element = document.getElementById("email");
      this.mensaje +='El campo "Correo" es obligatorio.';
      element.classList.add("error");
      this.error = true;
      element.focus();
    }

    if (!this.password) {
      let element = document.getElementById("pass");
      this.mensaje +=' El campo "Contraseña" es obligatorio.';
      element.classList.add("error");
      this.error = true;
      element.focus();
    }
    if (this.error) {
      this.mostrar_mensaje(this.mensaje, 3000);
      return;
    }
    
    this._us.log_in(this.email,this.password);
    const loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 2000
    });
    loader.present();

    this.events.subscribe('token:val', (token) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      if(token){
        this._us.check_1(token);
        this.events.subscribe('check_1:val', (token) => {
          // user and time are the same arguments passed in `events.publish(user, time)`
          if (token) {

            loader.dismiss();
            this.token = token;
            this.main.rootPage = HomePage;

          }
          this.events.unsubscribe('check_1:val', null)
        });
        
        

      }
      this.events.unsubscribe('token:val', null)
    });
    this.events.subscribe('error:val', (error, correo) => {
      this.events.unsubscribe('error:val', null)
      // user and time are the same arguments passed in `events.publish(user, time)`
      if (error) {
        loader.dismiss();
        if (error == "Usuario no verificado") {
          this.alertCtrl.create({
            title: "Error",
            subTitle: error,
            buttons: [
              {
                text: 'Cancelar'
              },
              {
                text: 'Verificar',
                handler: () => {
                  const modal = this.modalCtrl.create(ValidarCuentaPage, { correo: correo });
                  modal.present();
                  this.events.subscribe('conf:doit', (estadoVal) => {
                    // user and time are the same arguments passed in `events.publish(user, time)`
                    if (estadoVal) {
                      this.main.rootPage = HomePage;
                    }
                    this.events.unsubscribe('conf:doit', null)
                  });
                }
              }]
          }).present();
        } else if (error.startsWith("{")) {
          var obj = JSON.parse(error);
          this.alertCtrl.create({
            title: "Error",
            subTitle: obj.error,
            message: obj.mensaje,
            buttons: ["OK"]
          }).present();
        } else {
          this.alertCtrl.create({
            title: "Error",
            subTitle: error,
            buttons: ["OK"]
          }).present();
        }
      }
      
    });
    
  }

  cargar(page:number){
    switch(page){
      case 1:
        const modal = this.modalCtrl.create(RecuperarPassPage);
        modal.present();
      break;

      case 2:
        this.navCtrl.push(NuevaMainCuentaPage);
      break;
    }
  }

  mostrar_mensaje(mensaje: string, time: number) {
    const toast = this.toastCtrl.create({
      message: mensaje,
      duration: time,
      position: 'top'
    });
    toast.present();
  }

  updateUser(event){
    let element = document.getElementById("email");
    element.classList.remove("error");
    if (event.keycode == 13 || event.which == 13) {
      this.inciar();
    }
  }

  updatePass(event) {
    let element = document.getElementById("pass");
    element.classList.remove("error");
    if (event.keycode == 13 || event.which == 13) {
      this.inciar();
    }
  }
}
