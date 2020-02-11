import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProfileStats({
  colors,
  cardsCount = 0,
  contactsCount = 0,
}) {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statItemContainer}>
        <Icon
          name="ios-person"
          size={styles.text.fontSize * 1.9}
          color={colors[1]}
        />
        <Text style={styles.text}>{contactsCount}</Text>
      </View>
      <View style={styles.statItemContainer}>
        <Icon
          name="ios-card"
          size={styles.text.fontSize * 1.9}
          color={colors[1]}
        />
        <Text style={styles.text}>{cardsCount}</Text>
      </View>
    </View>
  );
}

const styles = {
  statsContainer: {
    backgroundColor: '#fafafa',
    shadowColor: '#0c0c0c',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    flexDirection: 'row',
  },
  statItemContainer: {
    padding: 6,
    alignItems: 'center',
    marginLeft: 12,
    marginRight: 12,
  },
  text: {
    fontSize: 15,
  },
};
