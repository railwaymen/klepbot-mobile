import React from 'react';
import {View} from 'react-native';

import CurrentUser from '../helpers/current-user';

class MainScreen extends React.Component {
  componentDidMount() {
    CurrentUser.get().then(user => {
      const {navigate} = this.props.navigation;

      user.token ? navigate('Home') : navigate('Login');
    });
  }

  render = () => <View />;
}

export default MainScreen;
