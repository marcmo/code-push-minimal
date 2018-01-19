import CodePush from 'react-native-code-push';
import {
  Platform,
} from 'react-native';

const CodePushLocalConfig = {
  updateDialog: CodePush.DEFAULT_UPDATE_DIALOG,
  installMode: CodePush.InstallMode.IMMEDIATE,
  deploymentKey: Platform.select({
    android: 'AmXKBvnbbGfliTJGG0ZpBoSlEuygrJ0v9LkHz',
    ios: '***',
  }),
};
export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  scanInterval: 6100, // ms
  scanDuration: 500, // ms
  scanFoundVibrateDuration: 400,
  backendTimeout: 10000, // in ms
  codePushConfig: CodePushLocalConfig,
};
