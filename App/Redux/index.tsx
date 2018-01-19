import * as Redux from 'redux';
import { persistCombineReducers } from 'redux-persist';
import rootSaga from '../Sagas/';
import configureStore from './CreateStore';
import { RootState } from '../Types';
import { appReducer } from './AppRedux';
import { REDUX_PERSIST } from '../Config/ReduxPersist';

const baseReducer: Redux.Reducer<RootState> = persistCombineReducers(
  REDUX_PERSIST.storeConfig,
  {
    app: appReducer,
  },
);

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STATE') {
    state = undefined;
  }
  return baseReducer(state, action);
};
// export default postReducer;
export default async (): Promise<Redux.Store<RootState>> => {
  return await configureStore(rootReducer, rootSaga);
};
