import { AlertController, Platform, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage'

import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


import { URL_SERVICIOS } from './../../config/url.servicios';

import 'rxjs/Rx';
import 'rxjs/add/operator/catch';

@Injectable()
export class UsuarioService {

  token: string;
  idUsuario: string;

  constructor(public http: HttpClient,
              private alertCtrl: AlertController,
              public events: Events,
              private platform: Platform,
              private storage: Storage) {}
  
  
  
  check_1(token) {

    let url = URL_SERVICIOS + "check_1";
    var error;
    
    return this.http.post<any>(url, {} , 
                              { 
                                headers: new HttpHeaders()
                                  .set('Authorization', token) 
                              }
    ).map(resp => {
      let data_resp = resp;
      this.guardarDat(JSON.stringify(data_resp['data']));
      this.guardarLog(data_resp['status']);
      this.events.publish('check_1:val', true, '');


    }).catch((err: HttpErrorResponse) => {
      if (!err.error.msg) {

        error = "Conexión Rechazada";
        this.events.publish('check_1:val', false, error);

      } else {
        error = err.error.msg;
        this.events.publish('check_1:val', false, error);
      }
      return Observable.empty<any>();
    }).subscribe();
  }

  validar(verifPassword, email){
    let url = URL_SERVICIOS + "validar";
    let statusConf = null;

    const body = new HttpParams()
      .set('verifPassword', verifPassword)
      .set('email', email);


    return this.http.put<any>(url, body.toString(), { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') }
    ).map(resp => {
      let data_resp = resp;
      statusConf = data_resp['data'];
      this.token = data_resp['token'];
      this.guardarToken(this.token);
      this.events.publish('statusConfi:val', true, statusConf);




    }).catch((err: HttpErrorResponse) => {
      if (!err.error.msg) {

        statusConf = "Conexión Rechazada";
        this.events.publish('statusConfi:val', false, statusConf);

      } else {
        statusConf = err.error.msg;
        this.events.publish('statusConfi:val', false, statusConf);
      }
      return Observable.empty<any>();
    }).subscribe();
  }

  reenviarCorreo(email) {
    let url = URL_SERVICIOS + "reenviarCorreo";
    let sendMail;
    const body = new HttpParams()
      .set('email', email);


    return this.http.put<any>(url, body.toString(), { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') }
    ).map(resp => {
      sendMail = true;
      this.events.publish('mail:send', sendMail, "");
    }).catch((err: HttpErrorResponse) => {
      if (!err.error.msg) {
        sendMail = false;
        this.events.publish('mail:send', sendMail, err.error.msg);
      } else {
        sendMail = false;
        this.events.publish('mail:send', sendMail, err.error.msg);
      }
      return Observable.empty<any>();
    }).subscribe();
  }

  recuPass(email) {
    let url = URL_SERVICIOS + "enviarCodSeg";
    let sendMail;
    const body = new HttpParams()
      .set('email', email);


    return this.http.put<any>(url, body.toString(), { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') }
    ).map(resp => {
      sendMail = true;
      this.events.publish('codSeg:send', sendMail);
    }).catch((err: HttpErrorResponse) => {
      if (!err.error.msg) {
        sendMail = false;
        this.events.publish('codSeg:send', sendMail);
      } else {
        sendMail = false;
        this.events.publish('codSeg:send', sendMail);
      }
      return Observable.empty<any>();
    }).subscribe();
  }

  recuPassValidar(recuPassword, email) {
    let url = URL_SERVICIOS + "validarCodSeg";
    let passVal;

    const body = new HttpParams()
      .set('recuPassword', recuPassword)
      .set('email', email);


    return this.http.put<any>(url, body.toString(), { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') }
    ).map(resp => {
      passVal = true;
      this.events.publish('passVal:val', passVal);

    }).catch((err: HttpErrorResponse) => {
      if (!err.error.msg) {
        passVal = false;
        this.events.publish('passVal:val', passVal);
      } else {
        passVal = false;
        this.events.publish('passVal:val', passVal);
      }
      return Observable.empty<any>();
    }).subscribe();
  }

  guardarPass(password, email) {
    let url = URL_SERVICIOS + "guardarPass";
    let save;

    const body = new HttpParams()
      .set('password', password)
      .set('email', email);


    return this.http.put<any>(url, body.toString(), { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') }
    ).map(resp => {
      save = true;
      this.events.publish('save:val', save, '');

    }).catch((err: HttpErrorResponse) => {
      if (!err.error.msg) {
        save = false;
        this.events.publish('save:val', save, '');
      } else {
        save = false;
        this.events.publish('save:val', save, err.error.msg);
      }
      return Observable.empty<any>();
    }).subscribe();
  }

  log_in(email: string, password: string) {
    
    let url = URL_SERVICIOS + "login";
    let error = null;
    
    const body = new HttpParams()
      .set('usuario', email)
      .set('password', password);

  
    return this.http.post<any>(url, body.toString(), { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') }
    ).map(resp => {
      let data_resp = resp;
      this.token = data_resp['token'];
      this.guardarToken(this.token);
      this.events.publish('token:val', this.token);
         
      
    }).catch((err: HttpErrorResponse) => {
      if (!err.error.msg) {
        error = "Conexión Rechazada"
        this.events.publish('error:val', error, "");
      } else {
        if (err.error.timeRest)
        {
          let min = err.error.timeRest.minutos;
          let seg = err.error.timeRest.segundos;
          if (seg < 10) {
            seg = "0" + seg;
          }
          if (min < 10) {
            min = "0" + min;
          }
          let msg = min+":"+seg

          let jsonError = {
              error: err.error.msg,
              mensaje: "Tiempo espera " + msg
          }
          error = JSON.stringify(jsonError);
          this.events.publish('error:val', error, "");
        }
        else{
          error = err.error.msg;
          this.events.publish('error:val', error, err.error.data);
        }
        
      }
      return Observable.empty<any>();
    }).subscribe();
  }

  private guardarToken(token) {
    if (this.platform.is("cordova")) {
      this.storage.set('token',token);
    } else {
      if ( token )
      {
        localStorage.setItem('token',token)
      }else{
        localStorage.removeItem("token")
        localStorage.removeItem("data")
      }
    }
  }

  private guardarDat(data) {
    if (this.platform.is("cordova")) {
      this.storage.set('data', data);
    } else {
      if (data) {
        localStorage.setItem('data', data)
      } else {
        localStorage.removeItem("data")
      }
    }
  }


  private guardarLog(log) {
    if (this.platform.is("cordova")) {

      this.storage.set('log',log);
    } else {
      if( log )
      {
        localStorage.setItem('log',log)
      }else{
        localStorage.removeItem("log")
      }
    }
  }

  cargarToken(){
    let promesa = new Promise(( resolve, reject)=>{
      if(this.platform.is("cordova")){
        this.storage.ready()
                    .then( ()=>{
                      this.storage.get("token")
                                  .then( token =>{
                                    if( token ){
                                      this.token = token;
                                      this.events.publish('cargando:token', true);
                                    }
                                    resolve();
                                  });
                    });
      }else{
        if (localStorage.getItem("token")){
          this.token = localStorage.getItem("token");
        } 
        resolve();
      }
    })
    return promesa;
  }

  logOf(){
    this.token = null;

    // guardar storage
    this.guardarToken(this.token);
    
  }

  registrar(nvo_user){
    let url = URL_SERVICIOS + "registro";
    let estadoReg;
    const body = new HttpParams()
      .set('nombre', nvo_user.nombre)
      .set('apellidoP', nvo_user.apellidoP)
      .set('apellidoM', nvo_user.apellidoM)
      .set('fecha_nacimiento', nvo_user.fecha_nacimiento)
      .set('email', nvo_user.email)
      .set('usuario', nvo_user.usuario)
      .set('password', nvo_user.password);


    return this.http.post<any>(url, body.toString(), { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') }
    ).map(resp => {
      this.alertCtrl.create({
        title: 'Usuario Registrado',
        subTitle: 'Se enviara un código de confirmación a tu correo.',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              estadoReg = true;
              this.events.publish('reg:doit', estadoReg);
            }
          }]
      }).present();
    }).catch((err: HttpErrorResponse) => {
      if (!err.error.msg) {
        this.alertCtrl.create({
          title: "Error",
          subTitle: "Conexión Rechazada",
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                estadoReg = false;
                this.events.publish('reg:doit', estadoReg);
              }
            }]
        }).present();
      } else {
        this.alertCtrl.create({
          title: "Error",
          subTitle: err.error.msg,
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                estadoReg = false;
                this.events.publish('reg:doit', estadoReg);
              }
            }]
        }).present();

      }
      return Observable.empty<any>();
    }).subscribe();
  }

  validarContra(token, usr, pass) {

    let url = URL_SERVICIOS + "verifpass";
    var error;
    const body = new HttpParams()
      .set('password', pass)
      .set('usuario', usr);
    return this.http.post<any>(url, body.toString(),
      {
        headers: new HttpHeaders().set('Authorization', token).set('Content-Type', 'application/x-www-form-urlencoded')
          
      }
    ).map(resp => {
      let data_resp = resp;

      this.events.publish('verifPass:val', data_resp['status'], data_resp['msg']);


    }).catch((err: HttpErrorResponse) => {
      if (!err.error.msg) {

        error = "Conexión Rechazada";
        this.events.publish('verifPass:val', err.error.status, error);

      } else {
        error = err.error.msg;
        this.events.publish('verifPass:val', err.error.status, error);
      }
      return Observable.empty<any>();
    }).subscribe();
  }

  actualizar(token, body, id__) {

    let url = URL_SERVICIOS + "usuario/" + id__;
    var error;

    return this.http.put<any>(url, body.toString(),
      {
        headers: new HttpHeaders().set('Authorization', token).set('Content-Type', 'application/x-www-form-urlencoded')

      }
    ).map(resp => {
      let data_resp = resp;

      this.events.publish('actualizar:val', data_resp['status'], data_resp['msg']);


    }).catch((err: HttpErrorResponse) => {
      if (!err.error.msg) {

        error = "Conexión Rechazada";
        this.events.publish('actualizar:val', err.error.status, error);

      } else {
        error = err.error.msg;
        this.events.publish('actualizar:val', err.error.status, error);
      }
      return Observable.empty<any>();
    }).subscribe();
  }
  
}