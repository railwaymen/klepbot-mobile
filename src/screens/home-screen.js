import React from 'react';
import {View} from 'react-native';

import CurrentUser from '../helpers/current-user';

class HomeScreen extends React.Component {
  componentDidMount = () => {
    CurrentUser.get().then(user => {
      const {navigate} = this.props.navigation;

      user.token ? navigate('Main') : navigate('Login');
    });
  };

  render = () => <View />;
}

export default HomeScreen;
