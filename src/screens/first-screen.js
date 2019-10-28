import React from 'react';

import {View, Button, StyleSheet} from 'react-native';

const FirstScreen = props => {
  const onPress = () => {
    const {navigate} = props;
    navigate('Photo');
  };

  return (
    <View style={styles.container}>
      <Button title="Take a picture" onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default FirstScreen;
