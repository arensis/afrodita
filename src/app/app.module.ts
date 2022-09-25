import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import * as Components from './components';
import * as Layout from './layout';
import * as Pages from './pages';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    NgApexchartsModule
  ],
  declarations: [
    AppComponent,
    Components.StationCardComponent,

    Pages.HomePageComponent,
    Pages.StationDetailsPageComponent,

    Layout.FooterComponent,
    Layout.HeaderComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
