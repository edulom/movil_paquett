import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HomeFooterPage, HomeHeaderPage, HomeMenuPage } from '../pages/home/layout/index.home'

import { IonicStorageModule } from '@ionic/storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { EditCampoPage, ValidarcontraPage, PerfilmainPage, NuevaMainCuentaPage, LoginmainPage, NuevaCuentaPage, RecuperarPassPage, ValidarCuentaPage, ActualizarDatosPage } from '../pages/index.paginas.log';
import { HomePage, LoginPage, SplashPage, RecibirPage, EntregaPage, HistoryPage, NotificacionesPage, CalendarioPage, SoportePage } from '../pages/index.paginas.root'
import { UsuarioService } from '../providers/index.services';
import { TitleCasePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'ionic3-calendar-en';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    MyApp,
    HomePage, 
    LoginPage, 
    NuevaCuentaPage, 
    RecuperarPassPage, 
    SplashPage,
    HomeFooterPage,
    HomeHeaderPage,
    HomeMenuPage,
    ValidarCuentaPage,
    ActualizarDatosPage,
    LoginmainPage,
    NuevaMainCuentaPage,
    PerfilmainPage,
    ValidarcontraPage,
    EditCampoPage,
    RecibirPage,
    EntregaPage,
    HistoryPage,
    NotificacionesPage,
    CalendarioPage,
    SoportePage
  ],
  imports: [
    CalendarModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre', ],
      monthShortNames: ['Ene', 'Feb', 'Marzo', 'Abr', 'Mayo', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
    }),
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, 
    LoginPage, 
    NuevaCuentaPage,
    RecuperarPassPage, 
    SplashPage,
    HomeFooterPage,
    HomeHeaderPage,
    HomeMenuPage,
    ValidarCuentaPage,
    ActualizarDatosPage,
    LoginmainPage,
    NuevaMainCuentaPage,
    PerfilmainPage,
    ValidarcontraPage,
    EditCampoPage,
    RecibirPage,
    EntregaPage,
    HistoryPage,
    NotificacionesPage,
    CalendarioPage,
    SoportePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioService,
    TitleCasePipe,
    ScreenOrientation
  ]
})
export class AppModule {}
