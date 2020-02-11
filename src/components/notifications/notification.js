import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {colorPalette} from '../../shared/styles';

export default function Notification({
  id,
  description,
  title,
  newNotification,
  createdAgo,
  onPress,
  taskType: {color, name: taskName},
  user: {fullName, avatarUrl},
}) {
  const onNotificationPress = () => onPress(id);

  return (
    <TouchableOpacity
      onPress={onNotificationPress}
      style={[styles.container, {borderColor: color}]}>
      <View style={styles.leftBar}>
        <Image style={styles.avatarImage} source={{uri: avatarUrl}} />
        <Text style={styles.leftBarDescription}>{createdAgo}</Text>
      </View>
      <View style={styles.body}>
        {newNotification ? (
          <View style={styles.new}>
            <Text style={styles.newText}>NEW</Text>
          </View>
        ) : null}
        <View style={styles.row}>
          <Text>{fullName} | </Text>
          <Text>{title} | </Text>
          <Text>{taskName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  container: {
    flexDirection: 'row',
    borderLeftWidth: 4,
    flex: 1,
    padding: 14,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  leftBar: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  new: {
    padding: 6,
    borderRadius: 14,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,

    backgroundColor: colorPalette.secondary,
  },
  newText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '800',
  },
  leftBarDescription: {
    fontSize: 12,
    color: '#777',
    marginTop: 6,
    textAlign: 'center',
  },
  body: {
    flex: 3,
  },
  row: {
    flexDirection: 'row',
  },
  avatarImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  description: {
    color: '#777',
    paddingTop: 3,
    paddingBottom: 3,
  },
};
