import * as React from 'react';
import * as N from 'react-native-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import { Colors, Fonts, Metrics } from '../Themes';
import * as actions from '../Redux/actions';
import * as T from '../Types';
import { getIcon } from '../Lib/AppIcons';
import { log } from '../Lib/Logging';

const LOG = log('Settings');
interface Props {
  setTabIndex: (index: number) => any;
  navigator: N.Navigator;
}

class SettingsScreen extends React.Component<Props> {
  curriedModal = (screen, navigatorStyle, title, buttonId, iconId) => () => {
    this.showModal(screen, navigatorStyle, title, buttonId, iconId);
  }
  menuEntries = [
    {
      id: 0,
      title: 'DevOps',
      icon: 'build',
    },
  ];

  constructor(props: Props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event: N.NavigationEvent) {
    if (event.id === 'bottomTabSelected') {
      this.props.setTabIndex(event.selectedTabIndex);
    }
  }

  showModal = (screen: string, navigatorStyle: any, title: string, buttonId: string, iconId: string) => {
    this.props.navigator.showModal({
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
  }
  getTitleString = (titleId: string) => {
    return titleId;
  }
  getAction = (titleId: string) => {
    if (titleId === 'DevOps') {
      return this.curriedModal(
        'minimal.DevOpts',
        { navBarHidden: false },
        'DevOps Options',
        'close',
        'ios-arrow-down');
    }
    return () => LOG.d('no suitable action');
  }

  renderItem = ({ item: { icon, title } }) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={this.getAction(title)}
        style={styles.fullWidthButton}
      >
        <View style={styles.rowContainer}>
          <Icon name={icon} style={styles.itemIcon} />
          <Text style={styles.itemText}>
            {this.getTitleString(title)}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )

  keyExtractor = ({ id }) => `drawer-item-${id}`;

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const p = require('../../package.json');
    return (
      <View style={styles.container}>
        <View style={styles.optionsContainer}>
          <FlatList
            style={{ flex: 1 }}
            data={this.menuEntries}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
        <View style={styles.versionContainer}>
          <Text>App-Version: {p.version}</Text>
          <Text>Proto-Version: {p.protoVersion}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.snow,
    flex: 1,
  },
  optionsContainer: {
    flex: 4,
  },
  versionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.asbestos,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    ...Fonts.style.h3,
    textAlign: 'center',
    color: 'white',
    marginHorizontal: Metrics.section,
  },
  itemText: {
    ...Fonts.style.normal,
    textAlign: 'center',
    color: Colors.snow,
  },
  iconStyle: {
    color: 'white',
  },
  fullWidthButton: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: Colors.panther,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.snow,
  },
});

const mapDispatchToProps = (dispatch) => ({
  setTabIndex: (index: number) => dispatch(actions.selectedTab(index)),
});
const mapStateToProps = (state: T.RootState) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(
  SettingsScreen,
);
