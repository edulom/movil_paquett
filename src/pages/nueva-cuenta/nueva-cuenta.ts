import { Component } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { UsuarioService } from '../../providers/index.services'
import { AlertController } from 'ionic-angular';
import { TitleCasePipe } from '@angular/common';
@Component({
  selector: 'page-nueva-cuenta',
  templateUrl: 'nueva-cuenta.html',
})
export class NuevaCuentaPage {
  nvoUsr:FormGroup;
  errorG:boolean = false;
  errorN:boolean = false;
  errorAp:boolean = false;
  errorAm:boolean = false;
  errorUs: boolean = false;
  errorCoConf: boolean = false;
  errorCo: boolean = false;
  errorPass:boolean = false;
  errorConfPass:boolean = false;
  errorDate:boolean = false;
  tablet:boolean = false;

  constructor(private platform: Platform,
              public navCtrl: NavController,
              public navParams: NavParams,
              private _us: UsuarioService,
              public events: Events,
              private fb: FormBuilder,
              private loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private titlecasePipe: TitleCasePipe,
              private screenOrientation: ScreenOrientation) {
    if (!this.platform.is("cordova")) {
      if (this.screenOrientation.type == "landscape-primary") {
        this.tablet = true;
      } else {
        this.tablet = false;
      }
    }
    this.nvoUsr = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      apellidoP: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      apellidoM: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      fecha_nacimiento: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mailConf: ['', [Validators.required, Validators.email]],
      usuario: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15), Validators.pattern(/^[0-9a-z$_]+$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/)]],
      confPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/)]],
    });
  }

  saveData() {
    this.nvoUsr.value.nombre = this.titlecasePipe.transform(this.nvoUsr.value.nombre);
    this.nvoUsr.value.apellidoP = this.titlecasePipe.transform(this.nvoUsr.value.apellidoP);
    this.nvoUsr.value.apellidoM = this.titlecasePipe.transform(this.nvoUsr.value.apellidoM);
    this.validar(0);
    if(!this.errorG)
    {
      let nvo_user= this.nvoUsr.value;
      this._us.registrar(nvo_user);
      const loader = this.loadingCtrl.create({
        content: "Cargando...",
        duration: 2000
      });
      loader.present();
      this.events.subscribe('reg:doit', (estadoReg) => {
        loader.dismiss()
        if (estadoReg) {
          this.navCtrl.pop();
          estadoReg=false;
        }
        this.events.unsubscribe('reg:doit', null)
      });
    }
      
  }

  validar(id:number){
    switch(id){
      case 1:
        let elementN = document.getElementById("nombreC")
        if (this.nvoUsr.get('nombre').hasError('pattern')
        || this.nvoUsr.value.nombre == '') {
          elementN.classList.add("error");
          this.errorN = true;
        } else {
          elementN.classList.remove("error");
          this.errorN = false;
        }
        break;
      case 2:
        let elementAp = document.getElementById("apellidoPC")
        if (this.nvoUsr.get('apellidoP').hasError('pattern')
          || this.nvoUsr.value.apellidoP == '') {
          elementAp.classList.add("error");
          this.errorAp = true;
        } else {
          elementAp.classList.remove("error");
          this.errorAp = false;
        }
        break;
      case 3:
        let elementAm = document.getElementById("apellidoMC")
        if (this.nvoUsr.get('apellidoM').hasError('pattern')
          || this.nvoUsr.value.apellidoM == '') {
          elementAm.classList.add("error");
          this.errorAm = true;
        } else {
          elementAm.classList.remove("error");
          this.errorAm = false;
        }
        break;
      case 4:
        this.nvoUsr.value.email = this.nvoUsr.value.email.toLowerCase()
        let elementE = document.getElementById("emailC")
        if (this.nvoUsr.get('email').hasError('email') || this.nvoUsr.value.email == ''){
          elementE.classList.add("error");
          this.errorCo = true;
        }else{
          elementE.classList.remove("error");
          this.errorCo = false;
        }
        break;
      case 5:
        this.nvoUsr.value.usuario = this.nvoUsr.value.usuario.toLowerCase()
        let elementU = document.getElementById("usuarioC")
        if (this.nvoUsr.get('usuario').hasError('minlength') 
        ||  this.nvoUsr.get('usuario').hasError('maxlength')
        ||  this.nvoUsr.value.usuario == ''
        || this.nvoUsr.get('usuario').hasError('pattern')){
          elementU.classList.add("error");
          this.errorUs = true;
        } else {
          elementU.classList.remove("error");
          this.errorUs = false;
        }
        break;
      case 6:
        let elementC = document.getElementById("passwordC")
        if (this.nvoUsr.get('password').hasError('pattern') || this.nvoUsr.value.password == ''){
          elementC.classList.add("error");
          this.errorPass = true;
        } else {
          elementC.classList.remove("error");
          this.errorPass = false;
        }
        break;
      case 7:
        let elementRc = document.getElementById("confPasswordC")
        if (this.nvoUsr.value.password == this.nvoUsr.value.confPassword && this.nvoUsr.value.confPassword != ''){
          elementRc.classList.remove("error");
          this.errorConfPass = false;
        }else{
          elementRc.classList.add("error");
          this.errorConfPass = true;
        }
        break;
      case 8:
        let elementD = document.getElementById("fecha_nacimientoC")
        if (this.nvoUsr.value.fecha_nacimiento == null) {
          elementD.classList.add("error");
          this.errorDate = true;
        } else {
          elementD.classList.remove("error");
          this.errorDate = false;
        }
        break;
      case 9:
        let elementZ = document.getElementById("emailZ")
        this.nvoUsr.value.mailConf = this.nvoUsr.value.mailConf.toLowerCase()
        if (this.nvoUsr.value.email != this.nvoUsr.value.mailConf) {
          elementZ.classList.add("error");
          this.errorCoConf = true;
        } else {
          elementZ.classList.remove("error");
          this.errorCoConf = false;
        }
        break;
      case 0:
        this.validar(1);
        this.validar(2);
        this.validar(3);
        this.validar(4);
        this.validar(5);
        this.validar(6);
        this.validar(7);
        this.validar(9);
        
        break;
    }

    if (this.errorN ||
        this.errorAp ||
        this.errorAm ||
        this.errorCo ||
        this.errorUs ||
        this.errorPass ||
        this.errorConfPass ||
        this.errorDate ||
        this.errorCoConf){
          this.errorG = true;
    } else {
          this.errorG = false;
    }
    
  }


}
