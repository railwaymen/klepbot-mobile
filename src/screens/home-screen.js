import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

class HomeScreen extends React.Component {
  render() {
    const {view} = styles;

    // on home screen will be the gay for checking if user is loggin
    return (
      <View style={view}>
        <Text>Home Screen</Text>
        <Button
          title="Go to login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
