import { AsyncStorage } from 'react-native'

export const REDUX_PERSIST = {
  active: true,
  reducerVersion: '2.2',
  storeConfig: {
    key: 'primary',
    storage: AsyncStorage,
    whitelist: ['backend', 'user', 'app'],
    debug: true,
  }
}
