import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {HeaderTitle} from '../shared/header';

export default function PossibleNames({possibleNames, onPress, style}) {
  return (
    <View style={[containerStyles.possibleNames, style]}>
      <HeaderTitle>Possible names</HeaderTitle>
      {possibleNames.map(name => (
        <TouchableOpacity
          style={containerStyles.possibleName}
          onPress={() => onPress(name)}>
          <Text>{name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const containerStyles = {
  possibleName: {
    padding: 12,
  },
};
