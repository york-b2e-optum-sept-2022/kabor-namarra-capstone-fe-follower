import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProcessDashboardComponent } from './components/process-dashboard/process-dashboard.component';
import { ProcessListComponent } from './components/process-list/process-list.component';
import { ProcessComponent } from './components/process/process.component';
import { ProcessDisplayComponent } from './components/process-display/process-display.component';
import { StageComponent } from './components/stage/stage.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    ProcessDashboardComponent,
    ProcessListComponent,
    ProcessComponent,
    ProcessDisplayComponent,
    StageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
