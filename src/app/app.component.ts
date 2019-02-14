import { Component } from '@angular/core';
import { Platform, Events, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { HomePage, SplashPage } from '../pages/index.paginas.root';
import { UsuarioService } from '../providers/index.services';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = '';
  token: string ;
  log: boolean = false;//leer variable desde bd
  constructor(private platform: Platform,
              private storage: Storage,
              private _us: UsuarioService,
              public events: Events,
              private alertCtrl: AlertController,
              private screenOrientation: ScreenOrientation) {
    platform.ready().then(() => {
      if (this.platform.is("cordova")) {
        if (this.platform.is('tablet')) {
          this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE_PRIMARY);
        } else if (this.platform.is('phablet')) {
          this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
        } else if (this.platform.is('mobile')) {
          this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
        }
        
      }
      this.verificarLog();
    });
  }

  cambiarRoot(page:number){

    switch(page){
      case 1:
        this.rootPage = HomePage;
      break;

      case 2:
        this.rootPage = SplashPage;
      break;
    }

  }

  verificarLog() {

    this.cargar()
    
    this.events.subscribe('cargando:token', (estado) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      if (estado) {
          if (this.token) {
            this._us.check_1(this.token);
            
            this.events.subscribe('check_1:val', (log, error) => {
              // user and time are the same arguments passed in `events.publish(user, time)`
              if (log) {
                this.cargarLog();
                this.events.subscribe('cargando:log', (estado) => {
                  // user and time are the same arguments passed in `events.publish(user, time)`
                  
                  if (estado) {
                    if (this.log) {
                      this.cambiarRoot(1)
                    } else {
                      this.cambiarRoot(2)
                    }
                  }
                  this.events.unsubscribe('cargando:log', null)
                });
              } else if (error) {
                this.cambiarRoot(2)
                this.alertCtrl.create({
                  title: "Error",
                  subTitle: error,
                  buttons: [
                    {
                      text: 'Ok',
                      handler: () => {
                        this._us.logOf();
                      }
                    }]
                }).present();
              }
              this.events.unsubscribe('check_1:val', null)
            });
            
          } else {
            this.cambiarRoot(2)
          }
      }
      this.events.unsubscribe('cargando:token', null)
    });

    if (!this.platform.is("cordova")) {
      if (this.token) {
        this._us.check_1(this.token);

        this.events.subscribe('check_1:val', (log, error) => {
          // user and time are the same arguments passed in `events.publish(user, time)`
          if (log) {
            this.cargarLog();
            if (this.log) {
              this.cambiarRoot(1)
            } else {
              this.cambiarRoot(2)
            }
          } else if (error) {
            this.cambiarRoot(2)
            this.alertCtrl.create({
              title: "Error",
              subTitle: error,
              buttons: [
                {
                  text: 'Ok',
                  handler: () => {
                    this._us.logOf();
                  }
                }]
            }).present();
          }
          this.events.unsubscribe('check_1:val', null)
        });

      } else {
        this.cambiarRoot(2)
      }

    }
  }
  

  cargar(){
    let promesa = new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        this.storage.ready()
          .then(() => {
            this.storage.get("token")
              .then(token => {
                if (token) {
                  this.token = token;
                }
                this.events.publish('cargando:token', true);
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

  cargarLog() {
    let promesa = new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        this.storage.ready()
          .then(() => {
            this.storage.get("log")
              .then(log => {
                if (log) {
                  this.log = log;
                }
                this.events.publish('cargando:log', true);
                resolve();
              });
          });
      } else {
        if (localStorage.getItem("log")) {
          if (localStorage.getItem("log") == "true"){
            this.log = true;
          }
        }
        resolve();
      }
    })
    return promesa;
  }
}

