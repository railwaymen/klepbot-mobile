import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';

export default function Contact({
  id,
  firstName,
  lastName,
  email,
  phoneNumbers,
  onPress,
}) {
  const onContactSelect = () => onPress(id);

  const [animatedOpacity] = useState(new Animated.Value(0));

  Animated.timing(animatedOpacity, {
    toValue: 1,
    duration: 400,
    useNativeDriver: true,
  }).start();

  return (
    <Animated.View style={[styles.container, {opacity: animatedOpacity}]}>
      <TouchableOpacity onPress={onContactSelect} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.header}>
            {firstName} {lastName}
          </Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.text}>Email: {email}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = {
  container: {
    padding: 12,
  },
  card: {
    backgroundColor: '#fafafa',
    borderRadius: 6,
    shadowColor: '#aaa',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
  },
  body: {
    padding: 18,
  },
  cardHeader: {
    padding: 18,
    borderColor: '#dedede',
    marginBottom: 6,
  },
  text: {
    color: '#777',
  },
  header: {
    color: '#333',
    fontSize: 24,
    marginBottom: 1,
  },
};
