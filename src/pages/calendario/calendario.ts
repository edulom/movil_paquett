import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-calendario',
  templateUrl: 'calendario.html',
})
export class CalendarioPage {
  fechaSelect:string;
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2017', '2018', '2019'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  
  public barChartData:any[] = [
    {data: [875, 1500, 1875], label: 'Envios'}
  ];
  public colors = [
    {
      backgroundColor: [
        '#12365E',
        '#12365E',
        '#12365E'
      ]
    }
  ];
  meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {

  }

  onDaySelect(evento) {
    this.fechaSelect = evento.date + " " + this.meses[evento.month] + " " + evento.year;
  }

}
