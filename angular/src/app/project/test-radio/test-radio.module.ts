import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';


import { TestRadioComponent } from './test-radio.component';


@NgModule({
  imports:      [ BrowserModule, FormsModule ,
  MatButtonModule, MatCheckboxModule,
  MatRadioModule
  ],
  declarations: [ TestRadioComponent ],
  bootstrap:    [ TestRadioComponent ]
})
export class AppModule { }
