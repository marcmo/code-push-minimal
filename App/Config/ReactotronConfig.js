import Config from '../Config/DebugConfig'
import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'
import { log } from '../Lib/Logging'

const LOG = log('reactotron');
LOG.d('in reactotron config')
if (Config.useReactotron) {
  LOG.d('in reactotron config')
  // https://github.com/infinitered/reactotron for more options!
  Reactotron
    .configure({
      name: 'Minimal App',
      host: '172.16.29.89'
    })
    .useReactNative()
    .use(sagaPlugin())
    .use(reactotronRedux())
    .connect()
  LOG.d('in reactotron config...connected')

  // Let's clear Reactotron on every time we load the app
  Reactotron.clear()
  LOG.d('in reactotron config...cleared')
}
