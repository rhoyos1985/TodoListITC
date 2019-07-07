import {
    ListItemActions,
    ADD_NEW_ITEM,
    DELETE_ITEM,
    START_UPDATE_ITEM
  } from './list-item.actions';
  
  import { ItemData } from './item-data-model';
  
  export interface State {
    listItems: ItemData[];
    newItem: ItemData;
    updateItem: ItemData;
  }
  
  const initialState: State = {
    listItems: [],
    newItem: null,
    updateItem: null,
  };
  
  export function listItemReducer(state = initialState, action: ListItemActions) {
    switch (action.type) {
      case ADD_NEW_ITEM:
        return {
          ...state,
          listItems: action.payload
        };
      case DELETE_ITEM:
        return {
          ...state,
          listItems: action.payload
        };
      case START_UPDATE_ITEM:
        return {
          ...state,
          updateItem: { ...state.listItems.find(itm => itm.id === action.payload) }
        };
      default: {
        return state;
      }
    }
  }
  
  
  export const getItems = (state: State) => state.listItems;
  export const getItem = (state: State) => state.updateItem;
  