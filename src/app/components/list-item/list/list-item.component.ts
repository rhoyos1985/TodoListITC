import { Store, select } from '@ngrx/store';

import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ListItemsService } from '../list-item.service';
import { ItemData } from '../item-data-model';
import * as fromRoot from '../../../app.reducer';



@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  itemForm: FormGroup;
  item: ItemData;
  listItems$: Observable<ItemData[]>;
  itemUpdate$: Observable<ItemData>;

  constructor( private fb: FormBuilder,
               private listItemServices: ListItemsService,
               private store: Store<fromRoot.State> ) { }

  ngOnInit() {
     
    this.getItems();
    this.subscribeServices();
    this.onChanges();
    this.itemForm = this.fb.group({
      id: [this.item !== undefined? this.item.id : ''],
      description: [this.item !== undefined? this.item.description : '', [Validators.required, Validators.maxLength(25)]]
    })
  }

  getItems() {
    this.listItemServices.getListItems();
  }

  drop(event: CdkDragDrop<string[]>) {
    this.listItems$.subscribe(items => moveItemInArray(items, event.previousIndex, event.currentIndex));
  }

  deleteAll() {
    this.listItemServices.deleteAllItems();
  }

  onChanges() {
    this.itemUpdate$.subscribe(item => {
      this.itemForm.setValue({
        id: item.id,
        description: item.description
      });
    });
  }

  onSubmit() {
    if(this.listItemServices.isExist(this.itemForm.value.description)){
      this.listItemServices.showSnackBar('This item Exists', null, 3000);
      return;
    }
    this.listItemServices
        .addOrUpdateItem({id: this.itemForm.value.id,
                          description: this.itemForm.value.description});
    this.resetForm();
  }

  subscribeServices() {
    this.listItems$ = this.store
                          .pipe(select(fromRoot.getItems), filter(val => val !== null))
    this.itemUpdate$ = this.store
                           .pipe(select(fromRoot.getItem), filter(val => val !== null))         
  }

  resetForm() {
    this.itemForm.setValue({
      id: '',
      description: ''
    });
  }

}
