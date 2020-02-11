import React, {Component} from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import NotificationsService from '../services/notifications-service';
import {colorPalette} from '../shared/styles';
import Notification from '../components/notifications/notification';

class NotificationsScreen extends Component {
  state = {
    notifications: [],
    isRefreshing: false,
  };

  componentDidMount() {
    this.fetchNotifications();
  }

  fetchNotifications = () => {
    return NotificationsService.all().then(({notifications}) => {
      this.setState({notifications, isRefreshing: false}, () => {
        NotificationsService.readNotifications();
      });
    });
  };

  onRefresh = () => {
    this.setState(
      {
        isRefreshing: true,
      },
      () => {
        this.fetchNotifications().catch(() => {
          this.setState({isRefreshing: false});
        });
      },
    );
  };

  onNotificationPress = contactId => {
    const {navigate} = this.props.navigation;

    navigate('Contact', {id: contactId});
  };

  render() {
    const {notifications, isRefreshing} = this.state;

    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={this.onRefresh}
          />
        }>
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            onPress={this.onNotificationPress}
            {...notification}
          />
        ))}
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: colorPalette.backgroundColor,
  },
};

export default NotificationsScreen;
