import * as N from 'react-native-navigation';
import { Platform } from 'react-native';
import { getIcon } from '../Lib/AppIcons';
import { Colors } from '../Themes/';
import { log } from '../Lib/Logging';

const LOG = log('tabbase');
const navigatorStyle = {
  navBarTitleTextCentered: true,
};
const navigatorStyleNoNavBar = {
  navBarTitleTextCentered: true,
  navBarHidden: true,
};

export enum TabID {
  MAP_SCREEN_ID,
}
export const switchToTab = (tabId: TabID, navigator: N.Navigator) => {
  switch (tabId) {
    case TabID.MAP_SCREEN_ID:
      navigator.switchToTab({ tabIndex: 1 });
      break;
    default:
      LOG.w('switching to unknown tab not supported');
  }
};
export const startTabs = (initialTabIndex: number) => {
  N.Navigation.startTabBasedApp({
    tabs: [{
      label: 'Map',
      screen: 'minimal.MapScreen',
      icon: getIcon('ios-navigate'),
      title: 'Available Cars',
      navigatorStyle: navigatorStyleNoNavBar,
    },
    {
      label: 'Settings',
      screen: 'minimal.SettingsScreen',
      icon: getIcon('ios-cog'),
      title: 'Settings',
      navigatorStyle,
    },
    ],
    animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
    tabsStyle: {
      tabBarBackgroundColor: '#FFF',
      tabBarButtonColor: '#666',
      tabBarSelectedButtonColor: Colors.tabSelected,
      tabBarLabelColor: '#000',
      tabBarSelectedLabelColor: Colors.tabSelected,
      initialTabIndex, // optional, the default selected bottom tab. Default: 0.
      // On Android, add this to appStyle
    },
    appStyle: {
      orientation: 'portrait',
      forceTitlesDisplay: true,
      statusBarTextColorScheme: 'dark',
      tabBarButtonColor: '#666',
      navBarTextColor: '#444',
      tabBarSelectedButtonColor: Colors.tabSelected,
      navBarBackgroundColor: '#FFF',
      navigationBarColor: '#000',
      statusBarColor: '#FFF',
      tabFontFamily: 'BioRhyme-Bold',
      initialTabIndex, // optional, the default selected bottom tab. Default: 0. needed for android
    },
  });
};
