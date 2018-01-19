import * as N from 'react-native-navigation';
import * as Redux from 'redux';

import { startTabs } from './tabBase';
import { RootState } from '../Types';
import { getIcon } from '../Lib/AppIcons';
import { log } from '../Lib/Logging';

const LOG = log('navigation');

export const startNavigation = (
  store: Redux.Store<RootState>,
  onboardingDone: boolean,
  loginExists: boolean) => {
  if (onboardingDone) {
    LOG.d(`starting with tab ${store.getState().app.selectedTab}`);
    startTabs(store.getState().app.selectedTab);
  } else {
    N.Navigation.startSingleScreenApp({
      screen: {
        screen: 'minimal.IntroScreen',
        title: 'IntroScreen',
        navigatorStyle: {
          navBarHidden: true,
        },
      },
      appStyle: {
        orientation: 'portrait',
      },
    });
  }
};

const showModal = (
  screen: string,
  navigatorStyle: any,
  title: string,
  buttonId: string,
  iconId: string) => {
  N.Navigation.dismissModal(); // make sure we do no double display
  N.Navigation.showModal({
    screen,
    title,
    navigatorStyle,
    navigatorButtons: {
      rightButtons: [
        {
          id: buttonId,
          icon: getIcon(iconId),
        },
      ],
    },
  });
};
