import React, {Component} from 'react';
import {View} from 'react-native';
import {Header2} from '../components/shared/header';
import CurrentUser from '../helpers/current-user';
import {colorPalette} from '../shared/styles';

class HomeScreen extends Component {
  state = {
    user: {},
  };

  onTabSelect = tab => {
    const {navigate} = this.props.navigation;

    navigate(tab);
  };

  componentDidMount() {
    CurrentUser.get().then(user => {
      this.setState({user});
    });
  }

  render() {
    const {firstName} = this.state.user;

    return (
      <View style={styles.container}>
        <Header2>Hello {firstName}</Header2>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: colorPalette.backgroundColor,
    flex: 1,
    padding: 12,
  },
  header: {
    fontSize: 24,
    padding: 12,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 20,
  },
};

export default HomeScreen;
