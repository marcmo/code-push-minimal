import {StyleSheet} from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.transparent,
    flexDirection: 'column'
  },
  input: {
    height: Metrics.searchBarHeight,
    backgroundColor: Colors.whiteTransparent02,
    marginBottom: 20,
    padding: Metrics.smallMargin,
    textAlign: 'left',
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.input,
    borderRadius: 5,
    color: Colors.snow
  },
  searchIcon: {
    left: Metrics.doubleBaseMargin,
    alignSelf: 'center',
    color: Colors.snow,
    backgroundColor: Colors.transparent
  }
})
