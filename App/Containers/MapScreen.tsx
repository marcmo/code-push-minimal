import * as React from 'react';
import {
  Text,
  Dimensions,
  View,
} from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Fonts, Metrics, ApplicationStyles, Colors } from '../Themes/';
import * as N from 'react-native-navigation';
import * as actions from '../Redux/actions';
import { log } from '../Lib/Logging';
import { mapStyle } from './Styles/MapStyle';

const LOG = log('Map');
const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height - 75,
};
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 48.1186891;
const LONGITUDE = 11.6012285;
const LATITUDE_DELTA = 0.0115;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const ZOOM_LEVEL = 1;

interface MyMarker {
  Title: string;
  Coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface Props {
  setTabIndex: (index: number) => any;
  navigator: N.Navigator;
}

interface State {
  region?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  currentLatitude: number | null;
  currentLongitude: number | null;
  location: MyMarker;
}

class MapScreen extends React.Component<Props, State> {

  state: State = {
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    currentLatitude: null,
    currentLongitude: null,
    location: {
      Title: 'ohmy',
      Coordinates: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },
    },
  };
  constructor(props: Props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  updateTitle(ps: Props) {
    this.props.navigator.setTitle({ title: `my title` });
  }
  componentWillReceiveProps(nextProps: Props) {
    this.updateTitle(nextProps);
  }
  onNavigatorEvent(event: N.NavigationEvent) {
    if (event.id === 'bottomTabSelected') {
      this.props.setTabIndex(event.selectedTabIndex);
    }
  }

  private map: any;
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref={(ref: any) => (this.map = ref)}
          style={styles.map}
          customMapStyle={mapStyle}
          showsScale={true}
          loadingEnabled={true}
          showsCompass={true}
          showsUserLocation={true}
          onLayout={this.onLayout}
          mapType={'standard'}
          onPress={
            (e) => {
              LOG.d(`Map::onPress`, e.nativeEvent);
            }
          }
        >
          <MapView.Polygon
            fillColor={'rgba(255,0,0,0.3)'}
            tappable={true}
            coordinates={[
              {
                latitude: 48.12185035809929,
                longitude: 11.597249507904053,
              },
              {
                latitude: 48.12205089427035,
                longitude: 11.598236560821533,
              },
              {
                latitude: 48.119694544817584,
                longitude: 11.59983515739441,
              },
              {
                latitude: 48.11890668350441,
                longitude: 11.596755981445312,
              },
              {
                latitude: 48.12185105199741,
                longitude: 11.597252923312112,
              },
            ]}
          />
        </MapView>
        <View style={styles.panelContainer} pointerEvents={'box-none'}>
          <Text style={styles.waitingText}>updated</Text>
        </View>
      </View>
    );
  }

  private onLayout = () => {
    const zoomCoordinates = {
      latitude: this.state.location.Coordinates.latitude,
      latitudeDelta: LATITUDE_DELTA / ZOOM_LEVEL,
      longitude: this.state.location.Coordinates.longitude,
      longitudeDelta: LONGITUDE_DELTA / ZOOM_LEVEL,
    };
    this.map.animateToRegion(zoomCoordinates);
  }
}

const styles = StyleSheet.create<any>({
  ...ApplicationStyles.screen,
  callout: {
    width: 60,
  },
  container: {
    alignItems: 'center',
    // paddingBottom: Metrics.baseMargin,
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 3,
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain',
  },
  centered: {
    alignItems: 'center',
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: Colors.markerCircleBackground,
    borderWidth: 1,
    borderColor: Colors.markerBorderBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: Colors.snow,
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: Colors.marker,
  },
  customView: {
    width: 140,
    height: 100,
  },
  waitingText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: Colors.coal,
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    marginHorizontal: 50,
    backgroundColor: 'transparent',
  },
  vinButtonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin,
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  infoText: {
    color: Colors.panther,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.input,
    marginVertical: Metrics.baseMargin,
  },
  photo: {
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    resizeMode: 'cover',
    width: Screen.width - 40,
    marginTop: 30,
  },
});

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  setTabIndex: (index: number) => dispatch(actions.selectedTab(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
