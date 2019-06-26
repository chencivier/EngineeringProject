import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { HighchartsChartComponent } from 'highcharts-angular';
@NgModule({
  declarations: [
    AppComponent,
    HighchartsChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA8hn8BErmXQjQJ7LMBh4YeVpuzpOiaRRE'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
