import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import Dexie from 'dexie';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { map, take } from 'rxjs/operators';

import { ItemData } from './item-data-model';
import * as fromListItem from './list-item.reducer';
import * as ListItem from './list-item.actions';
import { MatSnackBar } from '@angular/material';


@Injectable()
export class ListItemsService {
  private fbSubs: Subscription[] = [];
  private db: any;
  private listItems: ItemData[] = [];


  constructor(private store: Store<fromListItem.State>,
              private snackBar: MatSnackBar) {
    this.createDatabase();
  }


  getListItems() {
    this.store.dispatch(new ListItem.AddListItems(this.listItems));
  }

  deleteAllItems() {
    this.listItems = [];
    this.store.dispatch(new ListItem.AddListItems(this.listItems));
  }

  addOrUpdateItem(item: ItemData) {
    const indexItem = this.listItems.findIndex((itm => itm.id === item.id));
    
    if(indexItem === -1) 
      this.addItem(item.description);
    else
      this.listItems[indexItem].description = item.description;
  }

  addItem(newItem: string) {
    this.listItems.push({id: UUID.UUID(), description: newItem});
    this.store.dispatch(new ListItem.AddListItems(this.listItems));
  }

  updateItem(selectedItem: ItemData) {
    this.store.dispatch(new ListItem.StartUpdateItem(selectedItem.id));
  }

  deleteItem(selectedItem: ItemData) {
    const indexItem = this.listItems.indexOf(selectedItem);
    this.listItems.splice(indexItem, 1);
    this.store.dispatch(new ListItem.AddListItems(this.listItems));
  }

  isExist(description: string) {
    const indexItem = this.listItems.findIndex((itm => itm.description.trim().toUpperCase() === description.trim().toUpperCase()));
    return indexItem !== -1;
  }

  showSnackBar(message, action, duration) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }
  
  cancelSubscriptions() {
    this.fbSubs.forEach(subs => subs.unsubscribe());
  }

  private createDatabase() {
    this.db = new Dexie('TodosListDB');
    this.db.version(1).stores({
      listItems: 'id,description'
    });
  }
}
