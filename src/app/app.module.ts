import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ListItemComponent } from './components/list-item/list/list-item.component';
import { ItemComponent } from './components/list-item/item/item.component';

import { reducers } from './app.reducer';
import { ListItemsService } from './components/list-item/list-item.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListItemComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    DragDropModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [ListItemsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
