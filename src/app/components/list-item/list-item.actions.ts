import { Action } from '@ngrx/store';
import { ItemData } from './item-data-model';

export const ADD_NEW_ITEM = '[ListItem] Add New Item,';
export const START_UPDATE_ITEM = '[ListItem] Start Update Item';
export const DELETE_ITEM = '[ListItem] Delete Item';

export class AddListItems implements Action {
  readonly type = ADD_NEW_ITEM;

  constructor(public payload: ItemData[]) {}
}

export class StartUpdateItem implements Action {
  readonly type = START_UPDATE_ITEM;

  constructor(public payload: string) {}
}

export class DeleteItem implements Action {
  readonly type = DELETE_ITEM;

  constructor(public payload: ItemData[]) {}
}

export type ListItemActions = AddListItems | StartUpdateItem | DeleteItem;