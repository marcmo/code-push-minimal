import {
  AsyncStorage,
} from 'react-native';
import { log } from './Logging';

type StoreKey = 'onboarding' | 'reducerVersion' | 'loginStored';
const store = new Map<StoreKey, string>([
  ['onboarding', '@minimalStore:onboardingComplete'],
  ['loginStored', '@minimalStore:loginWasComplete'],
  ['reducerVersion', '@minimalStore:reducerVersion'],
]);
const asyncStoreKeys = (): Array<string> => Array.from(store.values());
const LOG = log('storage');

export const getAllStoredKeys = async (): Promise<Array<string>> => {
  return await AsyncStorage.getAllKeys();
};
const loadFromStore = async (key: StoreKey): Promise<string | null> => {
  const asyncStorageKey: string | undefined = store.get(key);
  if (undefined !== asyncStorageKey) {
    const res = await AsyncStorage.getItem(asyncStorageKey);
    LOG.d(`loaded value for ${key}: ${res}`);
    return res;
  } else {
    LOG.w(`key ${key} is not found in store!`);
  }
  return null;
};
const saveToStore = async (key: StoreKey, newValue: OnboardingState): Promise<boolean> => {
  const asyncStorageKey: string | undefined = store.get(key);
  if (undefined === asyncStorageKey) {
    LOG.e(`key ${key} needs to be defined in our store!`);
    return false;
  } else {
    try {
      await AsyncStorage.setItem(asyncStorageKey, newValue);
    } catch (error) {
      LOG.w(error.message);
      return false;
    }
  }
  return true;
};

export type OnboardingState = 'done' | 'notDone';

export const setOnboardingComplete = async (v: boolean): Promise<void> => {
  saveToStore('onboarding', v ? 'done' : 'notDone');
};
export const loginCompleted = async (v: boolean): Promise<void> => {
  saveToStore('loginStored', v ? 'done' : 'notDone');
};

export const onboardingComplete = async (): Promise<boolean> => {
  const value = await loadFromStore('onboarding');
  return value !== null && value === 'done';
};
export const loginStored = async (): Promise<boolean> => {
  const value = await loadFromStore('loginStored');
  return value !== null && value === 'done';
};

export const purgeStore = async (): Promise<void> => {
  await AsyncStorage.multiRemove(asyncStoreKeys(), (errors?: Error[]) => {
    alert(errors ? 'Error while purging storage' : 'Storage purged');
  });
};

export const nukeStore = async (): Promise<void> => {
  await AsyncStorage.clear((errors?: Error) => {
    alert(errors ? 'Error while nuking storage' : 'Storage nuked!');
  });
};
