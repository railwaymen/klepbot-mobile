import React from 'react';
import {View, Text} from 'react-native';

export default function CardMetadata({metadata}) {
  return (
    <View>
      <Text>{metadata}</Text>
    </View>
  );
}
