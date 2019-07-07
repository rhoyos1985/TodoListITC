import { Component, OnInit, Input } from '@angular/core';
import { ListItemsService } from '../list-item.service';
import { ItemData } from '../item-data-model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() item: ItemData;

  constructor( private listItemServices: ListItemsService ) { }

  ngOnInit() {
  }

  deleteItem(selectedItem: ItemData) {
    this.listItemServices.deleteItem(selectedItem);
  }

  editItem(selectedItem: ItemData) {
    this.listItemServices.updateItem(selectedItem);
  }
}
