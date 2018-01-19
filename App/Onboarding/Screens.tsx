import * as React from 'react';
import {
  StyleSheet,   // CSS-like styles
  Text,         // Renders text
  View,         // Container component
} from 'react-native';
import { Colors } from '../Themes';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from './Swiper';
import { Navigator } from 'react-native-navigation';

interface Props {
  navigator: Navigator;
}
export default class Screens extends React.Component<Props, object> {
  render() {
    return (
      <Swiper
        index={0}
        style={{}}
        navigator={this.props.navigator}
      >
        {/* First screen */}
        <View style={[styles.slide, { backgroundColor: Colors.emeraldLight }]}>
          <Icon name="ios-people" {...iconStyles} />
          <Text style={styles.header}>ID</Text>
          <Text style={styles.text}>add your ID number to identities, switch between identities</Text>
        </View>
        {/* Second screen */}
        <View style={[styles.slide, { backgroundColor: '#4AAFEE' }]}>
          <Icon name="ios-cloud-upload" {...iconStyles} />
          <Text style={styles.header}>VEHICLES</Text>
          <Text style={styles.text}>add your car with longpress on the map</Text>
        </View>
        {/* Third screen */}
        <View style={[styles.slide, { backgroundColor: '#FC515B' }]}>
          <Icon name="ios-heart" {...iconStyles} />
          <Text style={styles.header}>DRIVE</Text>
          <Text style={styles.text}>start the reservation on map screen</Text>
        </View>
      </Swiper>
    );
  }
}

const iconStyles = {
  size: 100,
  color: '#FFFFFF',
};

const styles = StyleSheet.create({
  // Slide styles
  slide: {
    flex: 1,                    // Take up all screen
    justifyContent: 'center',   // Center vertically
    alignItems: 'center',       // Center horizontally
  },
  // Header styles
  header: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  // Text below header
  text: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: 'center',
  },
});
