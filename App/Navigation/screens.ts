import { Navigation } from 'react-native-navigation';
import * as Redux from 'redux';
import { RootState } from '../Types';
import IntroScreen from '../Onboarding/Screens';
import DevOpts from '../Containers/DevOpts';
import SettingsScreen from '../Containers/SettingsScreen';
import MapScreen from '../Containers/MapScreen';
import CodePush from 'react-native-code-push';

const customCodePushConfig = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
};

export const registerScreens = (store: Redux.Store<RootState>, provider) => {
  Navigation.registerComponent('minimal.IntroScreen', () => IntroScreen, store, provider);
  Navigation.registerComponent('minimal.MapScreen', () => MapScreen, store, provider);
  Navigation.registerComponent('minimal.DevOpts', () => CodePush(customCodePushConfig)(DevOpts), store, provider);
  Navigation.registerComponent('minimal.SettingsScreen', () => SettingsScreen, store, provider);
};
