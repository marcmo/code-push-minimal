import * as React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { RootState } from '../Types';
import { Navigator } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import CodePush from 'react-native-code-push';

import AppConfig from '../Config/AppConfig';
import { purgeStore } from '../Lib/Storage';
import { Colors, Fonts, Metrics } from '../Themes';
import { getIcon } from '../Lib/AppIcons';
import { log } from '../Lib/Logging';

const LOG = log('DevOpts');
const ROW_HEIGTH = 55;

interface Props {
  currentStateName: string;
  resetStore: () => void;
  navigator: Navigator;
}

class DevOpts extends React.Component<Props> {
  cancel = () => {
    this.props.navigator.dismissModal();
  }
  start = () => {
    LOG.d('Start booking');
    this.props.navigator.dismissModal();
  }

  pause = () => {
    LOG.d('Pause booking');
    this.props.navigator.dismissModal();
  }

  stop = () => {
    LOG.d('Stop booking');
    this.props.navigator.dismissModal();
  }

  useSimulator = () => {
    LOG.d('Switch backend connection to simulator');
    this.props.navigator.dismissModal();
  }

  useBle = () => {
    LOG.d('Switch backend connection to BLE');
    this.props.navigator.dismissModal();
  }

  curriedModal = (screen, navigatorStyle, title, buttonId, iconId) => () => {
    this.showModal(screen, navigatorStyle, title, buttonId, iconId);
  }

  options = [
    {
      id: 0,
      title: 'Purge Store',
      action: () => {
        purgeStore();
        this.props.navigator.dismissModal();
      },
      icon: 'trash',
    },
    {
      id: 2,
      title: 'Reset local state',
      action: this.cancel,
      icon: 'eraser',
    },
  ];

  constructor(props: Props) {
    super(props);
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  componentDidMount() {
    LOG.d('DevOpts, componentDidMount, codepush sync');
    CodePush.sync(AppConfig.codePushConfig);
  }

  onNavigatorEvent = (event: any) => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'close') {
        this.props.navigator.dismissModal();
      }
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
  getSimulatorText = () => {
    return 'simulator';
  }
  getSimulatorTextReverse = () => {
    return 'simulator';
  }
  renderItem = ({ item: { action, title, icon } }) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={action}
          style={styles.fullWidthButton}
        >
          <View style={styles.rowContainer}>
            <Icon name={icon} style={styles.itemIcon} />
            <Text style={styles.itemText}>
              {title}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  keyExtractor = ({ id }) => `devopts-item-${id}`;

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <FlatList
            style={{ flex: 1 }}
            data={this.options}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text>selected</Text>
          <Text>state: {this.props.currentStateName}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
  },
  listContainer: {
    flex: 3,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    height: ROW_HEIGTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchText: {
    ...Fonts.style.normal,
    textAlign: 'center',
    color: Colors.pumpkin,
  },
  items: {
    flexDirection: 'row',
    height: ROW_HEIGTH,
    alignItems: 'center',
  },
  controllView: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Arial',
    fontSize: 15,
    color: Colors.snow,
  },
  controlText: {
    ...Fonts.style.normal,
    textAlign: 'center',
    color: Colors.pumpkin,
  },
  separator: {
    height: 2,
    backgroundColor: Colors.snow,
  },
  controlIcon: {
    ...Fonts.style.h3,
    textAlign: 'center',
    color: Colors.pumpkin,
  },
  itemIcon: {
    ...Fonts.style.h3,
    textAlign: 'center',
    color: 'white',
    marginHorizontal: Metrics.section,
    width: 30,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.pumpkin,
    width: 80,
    height: ROW_HEIGTH - 10,
    borderRadius: 8,
    marginHorizontal: Metrics.baseMargin,
  },
  itemText: {
    ...Fonts.style.normal,
    textAlign: 'center',
    color: Colors.snow,
  },
  fullWidthButton: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: Colors.pumpkin,
  },
});
const mapStateToProps = (state: RootState) => ({
  currentStateName: 'hello',
});
const mapDispatchToProps = (dispatch) => ({
  resetStore: (): void => dispatch({ type: 'RESET_STATE' }),
});
export default connect(mapStateToProps, mapDispatchToProps)(DevOpts);
