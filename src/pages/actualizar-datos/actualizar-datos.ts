import { Component } from '@angular/core';
import { NavController, NavParams, Platform, Events, ModalController, /* LoadingController, */  } from 'ionic-angular';
/* import { FormBuilder, FormGroup, Validators } from '@angular/forms'; */
/* import { TitleCasePipe } from '@angular/common'; */
import { Storage } from '@ionic/storage'
import { AlertController } from 'ionic-angular';
import { ValidarcontraPage, EditCampoPage } from '../index.paginas.log'

@Component({
  selector: 'page-actualizar-datos',
  templateUrl: 'actualizar-datos.html',
})
export class ActualizarDatosPage {
  data;
  img_perfil:string;
  fecha_nacimiento:Date;
  nacimiento:string = 'Mayo 11, 1990';
  meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  nombre:string = 'Demo';
  confOn:boolean = false;
  token:string;
  usr:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events,
              public alertCtrl: AlertController,
              private platform: Platform,
              private storage: Storage,
              private modalCtrl: ModalController,
              /* private fb: FormBuilder, */
              /* private loadingCtrl: LoadingController, */
              /* private titlecasePipe: TitleCasePipe, */) {
    
  }

  ionViewDidLoad() {
    this.cargarDat();
    if (!this.platform.is("cordova")) {
      this.getData();
    }
    this.img_perfil = '../../assets/imgs/user.png'
    this.events.subscribe('cargando:token', (estado) => {
      
      // user and time are the same arguments passed in `events.publish(user, time)`
      if (estado) {
        if (this.data) {
          this.getData();
        }
      }
      this.events.unsubscribe('cargando:token', null)
    });
  }

  cargarDat() {
    let promesa = new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        this.storage.ready()
          .then(() => {
            this.storage.get("data")
              .then(data => {
                if (data) {
                  this.data = JSON.parse(data);
                  this.events.publish('cargando:token', true);
                }
                resolve();
              });
          });
      } else {
        if (localStorage.getItem("data")) {
          this.data = JSON.parse(localStorage.getItem("data"));
        }
        resolve();
      }
    })
    return promesa;
  }

  cargarToken() {
    let promesa = new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        this.storage.ready()
          .then(() => {
            this.storage.get("token")
              .then(token => {
                if (token) {
                  this.token = token;
                  this.events.publish('cargando:token', true);
                }
                resolve();
              });
          });
      } else {
        if (localStorage.getItem("token")) {
          this.token = localStorage.getItem("token");
        }
        resolve();
      }
    })
    return promesa;
  }

  getData(){
    if(this.data)
    {
      this.img_perfil = this.data.img_perfil;
      this.fecha_nacimiento = new Date(this.data.fecha_nacimiento)
      this.nacimiento = this.meses[this.fecha_nacimiento.getMonth()]
                        + ' ' + (this.fecha_nacimiento.getDate() + 1)
                        + ', ' + this.fecha_nacimiento.getFullYear()
      this.usr = this.data.email;
      this.nombre = this.data.nombre + " " + this.data.apellidoP +" " + this.data.apellidoM;
      this.cargarToken()
      this.events.subscribe('cargando:token', (token) => {
        // user and time are the same arguments passed in `events.publish(user, time)`
        if (token) {
          console.log(this.token)
        }
        this.events.unsubscribe('cargando:token', null)
      });
    }
    
    
  }
  conf(){
    if ( !this.confOn ) {
      const modal = this.modalCtrl.create(ValidarcontraPage, { token: this.token, usuario: this.usr });
      modal.present();
  
      this.events.subscribe('Log:val', (estado) => {
  
        if (estado) {
          this.confOn = !this.confOn
        } 
        this.events.unsubscribe('Log:val', null)
      });
    } else {
      this.confOn = !this.confOn
    }
    
  }

  editCampo(index:number){
    let modal;
    switch(index){
      case 0:
        modal = this.modalCtrl.create(EditCampoPage, { token: this.token, editar: 'Imagen de perfil', dato: index, id__: this.data.sub });
        modal.present();
        break;

      case 1:
        modal = this.modalCtrl.create(EditCampoPage, { token: this.token, editar: ['Nombres', 'Apellido Paterno', 'Apellido Materno'], dato: index, id__: this.data.sub });
        modal.present();
        break;

      case 3:
        modal = this.modalCtrl.create(EditCampoPage, { token: this.token, editar: 'Fecha de nacimiento', dato: index, id__: this.data.sub });
        modal.present();
        break;

      case 4:
        modal = this.modalCtrl.create(EditCampoPage, { token: this.token, editar: 'Contraseña', dato: index, id__: this.data.sub });
        modal.present();
        break;
    }
  }

}
