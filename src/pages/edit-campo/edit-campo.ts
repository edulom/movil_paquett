import { Component } from '@angular/core';
import { NavController, Events, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../providers/index.services'

import { HttpParams} from '@angular/common/http';
@Component({
  selector: 'page-edit-campo',
  templateUrl: 'edit-campo.html',
})
export class EditCampoPage {
  datoNuevo:string;
  dato:number;
  datosNuevos:string[];
  texto:boolean = false;
  fecha__:boolean = false;
  img:boolean = false;
  token:string;
  nombre:string;
  apellidoP:string;
  apellidoM:string;
  id__:string;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public events: Events,
              private _us: UsuarioService) {
    this.dato = navParams.get('dato');
    this.token = navParams.get('token');
    this.id__ = navParams.get('id__');
    if (this.dato == 1) {
      this.datosNuevos = navParams.get('editar');
    } else {
      this.datoNuevo = navParams.get('editar');
    }
    if (this.dato == 0){
      this.img = true;
    } else if (this.dato == 3){
      this.fecha__ = true;
    } else {
      this.texto = true;
    }
  }

  guardar(save:string,index:number){
    switch (index){
      case 0:
      break;
      
      case 1:
        const body = new HttpParams()
          .set('nombre', this.nombre)
          .set('apellidoP', this.apellidoP)
          .set('apellidoM', this.apellidoM);


        this._us.actualizar(this.token, body, this.id__);

        this.events.subscribe('actualizar:val', (estado,msg) => {
          console.log(msg)
          if (estado) {
          }
          this.events.unsubscribe('actualizar:val', null)
        });
      break;
      
      case 3:
        break;

      case 4:
        break;
    }
  }

  

}
