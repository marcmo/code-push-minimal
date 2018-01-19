import * as Redux from 'redux';

import { AppState } from '../Types';
import * as actions from './actions';
import { log } from '../Lib/Logging';

const LOG = log('AppRedux');
export const INITIAL_STATE: AppState = {
  selectedTab: 0,
};

type AppReducer = Redux.Reducer<AppState>;
export const appReducer: AppReducer =
  (state = INITIAL_STATE, action: actions.AppAction): AppState => {
    switch (action.type) {
      case actions.AppActionTypes.TAB_SELECTED:
        return {
          ...state,
          selectedTab: action.payload.index,
        };
      case actions.AppActionTypes.FOO_BAR:
        return state;
      default:
        return state;
    }
  };
