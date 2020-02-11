import React from 'react';
import {ScrollView, Text} from 'react-native';

export default function EmailBodyView({template}) {
  return (
    <ScrollView style={styles.composeEmail}>
      <Text>{template}</Text>
    </ScrollView>
  );
}

const styles = {
  composeEmail: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#eaeaea',
    marginBottom: 12,
    marginTop: 12,
  },
};
