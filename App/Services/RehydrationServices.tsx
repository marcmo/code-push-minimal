import * as Redux from 'redux';
import { AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist';
import { RootState } from '../Types';
import { REDUX_PERSIST } from '../Config/ReduxPersist';
import { log } from '../Lib/Logging';

const LOG = log('rehydration');
const updateReducers = (store: Redux.Store<RootState>) => {
  const reducerVersion = REDUX_PERSIST.reducerVersion;

  // Check to ensure latest reducer version
  AsyncStorage.getItem('@minimalStore:reducerVersion').then((localVersion) => {
    if (localVersion !== reducerVersion) {
      // Purge store
      LOG.w('reducer version changed, purging store!');
      persistStore(store, null).purge();
      AsyncStorage.setItem('@minimalStore:reducerVersion', reducerVersion);
    } else {
      persistStore(store, null);
    }
  }).catch(() => {
    persistStore(store, null);
    AsyncStorage.setItem('@minimalStore:reducerVersion', reducerVersion);
  });
};

export default {updateReducers};
