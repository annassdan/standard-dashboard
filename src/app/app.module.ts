import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {TheDashboardComponent} from './ideas/the-dashboard/the-dashboard.component';
import { AlatTanngkapComponent } from './ideas/master/alat-tanngkap/alat-tanngkap.component';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {LayoutModule} from '@angular/cdk/layout';
import {MainStateService} from './shared/services/main-state.service';

@NgModule({
  declarations: [
    AppComponent,
    TheDashboardComponent,
    AlatTanngkapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    /* dari angular cdk */
    LayoutModule,

    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatProgressBarModule,

    DeviceDetectorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
