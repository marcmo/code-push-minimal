import { Provider } from 'react-redux';
import * as Redux from 'redux';
import {
  AppState,
  AppStateStatus,
} from 'react-native';
import MessageQueue, { TO_JS } from 'react-native/Libraries/BatchedBridge/MessageQueue.js';

import createStore from './Redux';
import { RootState } from './Types';
import { registerScreens } from './Navigation/screens';
import { iconsLoaded } from './Lib/AppIcons';
import { onboardingComplete, loginStored } from './Lib/Storage';
import { log } from './Lib/Logging';
import { startNavigation } from './Navigation';

const LOG = log('app');
const NOISY_THRESHOLD = 100;
const THRESHOLD = 30;
let nativeMsgCounterToJs = 0;
let nativeMsgCounterFromJs = 0;
const messageMap = new Map<string, number>();
messageMap.set('RCTDeviceEventEmitter', 0);
messageMap.set('JSTimers', 0);
messageMap.set('Timing', 0);
messageMap.set('WebSocketModule', 0);

const handleCallsToJS = (info) => {
  const dirStr = 'N->JS';
  const count = nativeMsgCounterToJs++;
  LOG.d(`${count}:${dirStr} : ` +
    `${info.module ? (info.module + '.') : ''}${info.method}`,
    info.args);
};
const handleCallsToNative = (info) => {
  const dirStr = 'N<-JS';
  const count = nativeMsgCounterFromJs++;
  if (info.module != null && messageMap.has(info.module)) {
    const value = messageMap.get(info.module) || 0;
    messageMap.set(info.module, value + 1);
    if (value % NOISY_THRESHOLD === 0) {
      LOG.d(`[NOISY(${value})][${count}:${dirStr}] : ${info.module ? (info.module + '.') : ''}${info.method}`);
    }
  } else if (count % THRESHOLD === 0 && info.module != null) {
    LOG.d(`[${count}:${dirStr}] : ${info.module ? (info.module + '.') : ''}${info.method}`);
  }
};

const spyFunction = (info) => {
  if (info.type === TO_JS) {
    handleCallsToJS(info);
  } else {
    handleCallsToNative(info);
  }
};

const enableSpy = () => {
  MessageQueue.spy(spyFunction);
};

const handleAppStateChange = (nextAppState: AppStateStatus) => {
  LOG.d(`next app state: ${nextAppState}`);
  switch (nextAppState) {
    case 'active':
      LOG.d('we are active');
      // CodePush.sync(AppConfig.codePushConfig);
      break;
    default:
  }
};

LOG.d('starting...............');
enableSpy();

const pickStartScreen = async (store): Promise<void> => {
  const onboardingDone = await onboardingComplete();
  const loginExists = await loginStored();
  startNavigation(store, onboardingDone, loginExists);
};

const storePromise = createStore();
storePromise.then((store: Redux.Store<RootState>) => {
  LOG.d(`the persisted store was loaded!`);
  registerScreens(store, Provider);

  iconsLoaded.then(() => {
    pickStartScreen(store);
  });
  AppState.addEventListener('change', handleAppStateChange);
}, (reason) => {
  LOG.w('we got rejected during createStore');
});
