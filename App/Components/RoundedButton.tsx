import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './Styles/RoundedButtonStyles';

// Note that this file (App/Components/RoundedButton) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
export interface RoundedButtonProps {
  onPress: () => void;
  text: string;
  children?: string;
  navigator?: object;
}
const RoundedButton: React.SFC<RoundedButtonProps> = ({ onPress, text, children }) => {

  const getText = (): string => {
    const buttonText: string = (typeof children === 'undefined')
      ? text || children || ''
      : text || '';
    return buttonText.toUpperCase();
  };

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{getText()}</Text>
    </TouchableOpacity>
  );
};
export default RoundedButton;
