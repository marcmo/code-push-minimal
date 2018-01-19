import * as React from 'react';
import { Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { Fonts, Colors } from '../Themes/';

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height - 75,
};
export interface Props {
  onPress: () => void;
  text: string;
  textDisabled: string;
  disabled: boolean;
  light?: boolean;
  children?: string;
  navigator?: object;
}
const MapButton: React.SFC<Props> = ({ onPress, text, textDisabled, disabled, children, light }) => {

  const getText = (): string => {
    const content = disabled ? textDisabled : text;
    const buttonText: string = (typeof children === 'undefined')
      ? content || children || ''
      : content || '';
    return buttonText;
  };

  return (
    <TouchableOpacity
      style={disabled ? styles.buttonDisabled : (light == null || !light ? styles.button : styles.buttonLight)}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{getText()}</Text>
    </TouchableOpacity>
  );
};
export default MapButton;

const styles = StyleSheet.create<any>({
  button: {
    width: Screen.width / 1.2,
    height: Screen.width / 6,
    borderRadius: Screen.width / 6,
    marginHorizontal: 2,
    marginVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.leafgreen,
  },
  buttonLight: {
    width: Screen.width / 1.2,
    height: Screen.width / 6,
    borderRadius: Screen.width / 6,
    marginHorizontal: 2,
    marginVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.introBackgroundThree,
  },
  buttonDisabled: {
    width: Screen.width / 1.2,
    height: Screen.width / 6,
    borderRadius: Screen.width / 6,
    marginHorizontal: 2,
    marginVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.leafgreen50,
  },
  buttonText: {
    color: 'white',
    backgroundColor: 'transparent',
    ...Fonts.style.h5,
    textAlign: 'center',
  },
});
