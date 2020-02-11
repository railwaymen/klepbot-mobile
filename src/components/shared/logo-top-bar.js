import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colorPalette} from '../../shared/styles';

export default function LogoTopBar() {
  return <Text style={styles.topBar}>Klepbot</Text>;
}

export function NavButton({onPress, title, color = styles.topBar.color, icon}) {
  if (title === null) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.arrow}>
      <Icon name={icon} color={color} size={26} />
    </TouchableOpacity>
  );
}

export function BackButton({onPress, title, color = styles.topBar.color}) {
  if (title === null) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.arrow}>
      <Icon name="ios-arrow-round-back" color={color} size={26} />
    </TouchableOpacity>
  );
}

const styles = {
  arrow: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  topBar: {
    fontFamily: 'DancingScript-Regular',
    fontSize: 24,
    color: colorPalette.main,
  },
};
