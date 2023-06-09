import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { colorReducer } from './state/color.reducer';
import { ReactiveFormsModule } from '@angular/forms';
import { DrawingBoardComponent } from './components/drawing-board/drawing-board.component';
import { ControlsComponent } from './components/controls/controls.component';
import { ColorControlComponent } from './components/color-control/color-control.component';
import { SliderControlComponent } from './components/slider-control/slider-control.component';
import { CodeDisplayComponent } from './components/code-display/code-display.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    DrawingBoardComponent,
    ControlsComponent,
    ColorControlComponent,
    SliderControlComponent,
    CodeDisplayComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ colors: colorReducer }, {}),
    ReactiveFormsModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
