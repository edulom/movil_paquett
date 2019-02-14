import { Component } from '@angular/core';
import { NavController, Platform, AlertController, NavParams} from 'ionic-angular';
import { UsuarioService } from '../../../../providers/index.services'
import { LoginmainPage } from '../../../index.paginas.log'
import { HomePage, RecibirPage, EntregaPage, HistoryPage, NotificacionesPage, CalendarioPage, SoportePage } from '../../../index.paginas.root'
import { MyApp } from '../../../../app/app.component'
@Component({
  selector: 'page-home-menu',
  templateUrl: 'home-menu.html',
})
export class HomeMenuPage {
  
  tags: string[] = ["Recibir paquete", 
                          "Entregar", 
                          "Historial", 
                          "Informes", 
                          "Notificaciones", 
                          "Soporte", 
                          "Cerrar Sesión"];

  icons: string[] = [
                      "appname-recibir-paquete-inactivo", 
                      "appname-nuevo-pedido", 
                      "appname-historial", 
                      "appname-informes-inactivo", 
                      "appname-notificaciones", 
                      "appname-soporte", 
                      "appname-cerrar-sesion"];
  buttons:any [] = [];
  token:string = '';
  tablet:boolean = false;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public _us: UsuarioService,
              private main: MyApp,
              private rootHome: HomePage,
              private platform: Platform,
              private alertCtrl: AlertController) {
    let i = 0;
    this.tags.forEach(tag => {
      
      this.buttons.push({
        tags: tag,
        icons: this.icons[i]
      })
      i++;

    });
    if (this.platform.is('tablet')) {
      this.tablet = true;
    } else if (this.platform.is('phablet')) {
      this.tablet = false;
    } else if (this.platform.is('mobile')) {
      this.tablet = false;
    }
  }
  ionViewDidLoad() {
    document.getElementById('0').classList.remove("compoSelect");
    document.getElementById('icon' + 0).classList.remove("iconselect");
    document.getElementById('label' + 0).classList.remove("txtselect");

    document.getElementById('0').classList.add("compoSelect");
    document.getElementById('icon' + 0).classList.add("iconselect");
    document.getElementById('label' + 0).classList.add("txtselect");
  }


  mostrarContenido(index:number){
    for (let i = 0; i < this.tags.length; i++) {
      document.getElementById(i.toString()).classList.remove("compoSelect");
      document.getElementById('icon' + i.toString()).classList.remove("iconselect");
      document.getElementById('label' + i.toString()).classList.remove("txtselect");

      document.getElementById(i.toString()).classList.add("compoNoSelect");
      document.getElementById('icon'+i.toString()).classList.add("iconNoselect");
      document.getElementById('label'+i.toString()).classList.add("txtNoselect");
    }
    document.getElementById(index.toString()).classList.remove("compoNoSelect");
    document.getElementById(index.toString()).classList.add("compoSelect");

    document.getElementById('icon'+index.toString()).classList.remove("iconNoselect");
    document.getElementById('icon'+index.toString()).classList.add("iconselect");

    document.getElementById('label'+index.toString()).classList.remove("txtNoselect");
    document.getElementById('label'+index.toString()).classList.add("txtselect");
    switch(index){
      case 0:
        this.rootHome.rootPageMain = RecibirPage;
        break;
      case 1:
        this.rootHome.rootPageMain = EntregaPage;
        break;
      case 2:
        this.rootHome.rootPageMain = HistoryPage;
        break;
      case 3:
        this.rootHome.rootPageMain = CalendarioPage;
        break;
      case 4:
        this.rootHome.rootPageMain = NotificacionesPage;
        break;
      case 5:
        this.rootHome.rootPageMain = SoportePage;
        break;
      case 6:
        this.alertCtrl.create({
          title: "Alerta",
          subTitle: "¿Seguro que quieres salir?",
          buttons: [
            {
              text: 'No'
            },
            {
              text: 'Si',
              handler: () => {
                this._us.logOf();
                this.main.rootPage = LoginmainPage;
              }
            }]
        }).present();
        
        break;
    }
  }

  

  
}
