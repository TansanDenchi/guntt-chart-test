import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';
declare var $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  stepMinutes = 15;
  today: Date = new Date(2018, 1, 1, 0, 0, 0, 0);
  currentHours1 = 0;
  currentMinutes1 = 0;
  currentHours2 = 0;
  currentMinutes2 = 0;

  constructor(
    private ngZone: NgZone,
  ) {}

  ngOnInit() {
    console.log(this.stepMinutes);
    console.log(this.today);
    $(() => {
      $( '#slider-range' ).slider({
        range: true,
        min: this.today.getTime() / 1000,
        max: new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate(), 23, 59).getTime() / 1000,
        step: 86400 / 24 / (60 / this.stepMinutes),
        values: [ new Date(2018,  1,  1, 0).getTime() / 1000, new Date(2018,  1,  1,  18).getTime() / 1000 ],
        slide: ( event, ui ) => {
          this.ngZone.run(() => {
            this.currentHours1 = new Date(ui.values[0] * 1000).getHours();
            this.currentMinutes1 = new Date(ui.values[0] * 1000).getMinutes();
            this.currentHours2 = new Date(ui.values[1] * 1000).getHours();
            this.currentMinutes2 = new Date(ui.values[1] * 1000).getMinutes();
          });
        }
      });
    });
  }
}
