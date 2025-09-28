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
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from './material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    MaterialModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    NgApexchartsModule,
    FontAwesomeModule
  ],
  declarations: [
    AppComponent,

    Components.StationCardComponent,
    Components.StationDetailsHeaderComponent,
    Components.StepButtonComponent,
    Components.StationCardHeaderComponent,
    Components.StationCardMainComponent,
    Components.StationCardFooterComponent,

    Pages.HomePageComponent,
    Pages.StationDetailsPageComponent,

    Layout.FooterComponent,
    Layout.HeaderComponent,
    Layout.CardLayoutComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [MaterialModule]
})
export class AppModule { }
