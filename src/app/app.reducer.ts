import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromListItem from './components/list-item/list-item.reducer';

export interface State {
  listItem: fromListItem.State
}

export const reducers: ActionReducerMap<State> = {
  listItem: fromListItem.listItemReducer
}

export const getListItemState = createFeatureSelector<fromListItem.State>('listItem');
export const getItems = createSelector(getListItemState, fromListItem.getItems);
export const getItem = createSelector(getListItemState, fromListItem.getItem);