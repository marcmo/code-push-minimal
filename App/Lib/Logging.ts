import * as N from 'react-native-navigation';
import { Colors } from '../Themes/';

export const object2string = (o: object | null | undefined): string => {
  if (o == null) {
    return 'null';
  }
  const seen: Array<any> = [];
  const replacer = (key, value) => {
    if (value != null && typeof value === 'object') {
      if (seen.indexOf(value) >= 0) {
        return 'has cycles';
      }
      seen.push(value);
    }
    return value;
  };
  return JSON.stringify(o, replacer);
};

export const log = (component: string) => {
  return {
    d: (s: string, o?: object) => {
      if (undefined === o) {
        // eslint-disable-next-line
        console.log(`[minimal:${component}] ${s}`); // tslint:disable-line
      } else {
        // eslint-disable-next-line
        console.log(`[minimal:${component}] ${s} "${object2string(o)}"`); // tslint:disable-line
      }
    },
    w: (s: string, o?: object) => {
      if (undefined === o) {
        console.warn(`[minimal:${component}] ${s}`);
      } else {
        console.warn(`[minimal:${component}] ${s} ${object2string(o)}`);
      }
    },
    e: (s: string) => {
      console.error(`[minimal:${component}] ${s}`);
    },
  };
};

export const logToSnackBar = (text: string) => {
  N.Navigation.showSnackbar({
    text,
    actionColor: Colors.snow,
    textColor: Colors.snow,
    backgroundColor: Colors.charcoal,
    duration: 'short',
  });
};
