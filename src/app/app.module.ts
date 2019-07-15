import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatChipsModule,
  MatDividerModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {TheDashboardComponent} from './ideas/the-dashboard/the-dashboard.component';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {LayoutModule} from '@angular/cdk/layout';
import {AlatTangkapModule} from './ideas/master/alat-tangkap/alat-tangkap.module';
import {AlatTangkapComponent} from './ideas/master/alat-tangkap/alat-tangkap.component';
import { TextSkeletonComponent } from './shared/conponents/text-skeleton/text-skeleton.component';

@NgModule({
  declarations: [
    AppComponent,
    TheDashboardComponent,
    AlatTangkapComponent,
    TextSkeletonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    /* dari angular cdk */
    LayoutModule,

    MatButtonModule,
    MatChipsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatProgressBarModule,

    DeviceDetectorModule.forRoot(),
    AlatTangkapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
