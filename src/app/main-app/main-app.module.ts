import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainAppRoutingModule } from './main-app-routing.module';
import { MainAppComponent } from './main-app.component';


@NgModule({
  declarations: [
    MainAppComponent
  ],
  imports: [
    CommonModule,
    MainAppRoutingModule
  ]
})
export class MainAppModule { }
