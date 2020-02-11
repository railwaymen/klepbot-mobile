import React, {Component, Fragment} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NotificationsService from '../../services/notifications-service';
import {colorPalette} from '../../shared/styles';

class NotificationsTab extends Component {
  state = {
    notificationsCount: 0,
  };

  fetchNotifications = () => {
    NotificationsService.all().then(({notificationsCount}) => {
      this.setState({notificationsCount});
    });
  };

  componentDidMount() {
    this.fetchNotifications();

    this.fetchInterval = setInterval(this.fetchNotifications, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.fetchInterval);
  }

  render() {
    const {
      state: {notificationsCount},
      props: {color},
    } = this;

    return (
      <View style={styles.notifications}>
        <Notifications count={notificationsCount} />
        <Icon name="ios-notifications" size={20} color={color} />
      </View>
    );
  }
}

function Notifications({count}) {
  if (count === 0) {
    return <Fragment />;
  }

  return (
    <View style={styles.notificationsCounter}>
      <Text style={styles.infoText}>{count}</Text>
    </View>
  );
}

const styles = {
  notifications: {
    position: 'relative',
  },
  notificationsCounter: {
    borderColor: colorPalette.main,
    backgroundColor: colorPalette.main,
    borderWidth: 2,
    borderRadius: 8,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: '15%',
    width: 16,
    height: 16,
  },
  infoText: {
    fontSize: 8,
    color: '#efefef',
    zIndex: 100,
  },
};

export default NotificationsTab;
