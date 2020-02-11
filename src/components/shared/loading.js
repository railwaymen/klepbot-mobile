import React from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import {colorPalette} from '../../shared/styles';

export default function Loading({message = 'Loading'}) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colorPalette.main} />
      <Text>{message}</Text>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: colorPalette.main,
  },
};
