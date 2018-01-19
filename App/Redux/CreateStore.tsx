import * as Redux from 'redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { RootState } from '../Types';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import * as Saga from 'redux-saga';
import Config from '../Config/DebugConfig';
import { log } from '../Lib/Logging';
import { REDUX_PERSIST } from '../Config/ReduxPersist';
import Reactotron from 'reactotron-react-native';
import RehydrationServices from '../Services/RehydrationServices';

const LOG = log('CreateStore');
// creates the store
const createOurStore = (rootReducer, rootSaga): Promise<Redux.Store<RootState>> => {
  /* ------------- Redux Configuration ------------- */

  const middleware: Array<Redux.Middleware> = [];
  const enhancers: Array<Redux.GenericStoreEnhancer> = [];

  return new Promise((resolve, reject) => {
    try {
      // tslint:disable-next-line
      const sagaMonitor = Config.useReactotron ? (Reactotron as any).createSagaMonitor() : null;
      const sagaMiddleware: Saga.SagaMiddleware<any> = createSagaMiddleware({ sagaMonitor });
      middleware.push(sagaMiddleware);
      enhancers.push(applyMiddleware(...middleware));

      // enhancers.push((window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

      // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
      const createAppropriateStore = Config.useReactotron ? (Reactotron as any).createStore : createStore;
      const store: Redux.Store<RootState> = createAppropriateStore(rootReducer, compose(...enhancers));

      // configure persistStore and check reducer version number
      if (REDUX_PERSIST.active) {
        RehydrationServices.updateReducers(store);
      }

      // kick off root saga
      sagaMiddleware.run(rootSaga);

      persistStore( store, null, () => {
        resolve(store);
      });

      // persistStore( store, ReduxPersist.storeConfig, () => {
      //   LOG.d('persistStore returned!', store);
      //   resolve(store);
      // });
    } catch (e) {
      LOG.w('problem at startup', e);
      reject(e);
    }
  });
  // return store;
};
export default createOurStore;
