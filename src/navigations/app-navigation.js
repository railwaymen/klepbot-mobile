import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import MainScreen from '../screens/main-screen';
import LoginScreen from '../screens/login-screen';
import HomeScreen from '../screens/home-screen';
import CardsScreen from '../screens/cards-screen';
import CardScreen from '../screens/card-screen';
import ProfileScreen from '../screens/profile-screen';
import ContactsScreen from '../screens/contacts-screen';
import ContactScreen from '../screens/contact-screen';
import NotificationsScreen from '../screens/notifications-screen';

import React from 'react';
import LogoTopBar, {BackButton} from '../components/shared/logo-top-bar';
import Icon from 'react-native-vector-icons/Ionicons';
import {colorPalette} from '../shared/styles';
import NotificationsTab from './tabs/notifications-tab';

const defaultsStackNavigator = {
  defaultNavigationOptions: {
    headerTitle: () => <LogoTopBar />,
    headerLeft: args => <BackButton {...args} />,
  },
};

const defaultsBottomTabNavigator = {
  tabBarOptions: {
    activeTintColor: colorPalette.main,
  },
};

const CardsStack = createStackNavigator(
  {
    Cards: {screen: CardsScreen},
    Card: {screen: CardScreen},
  },
  defaultsStackNavigator,
);

const ContactsStack = createStackNavigator(
  {
    Contacts: {screen: ContactsScreen},
    Contact: {screen: ContactScreen},
  },
  defaultsStackNavigator,
);

const HomeStack = createStackNavigator(
  {
    Home: {screen: HomeScreen},
  },
  defaultsStackNavigator,
);

const NotificationsStack = createStackNavigator(
  {
    Notifications: {screen: NotificationsScreen},
  },
  defaultsStackNavigator,
);

const BottomStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-home" size={20} color={tintColor} />
        ),
      },
    },
    Contacts: {
      screen: ContactsStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-people" size={20} color={tintColor} />
        ),
      },
    },
    Cards: {
      screen: CardsStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-card" size={20} color={tintColor} />
        ),
      },
    },
    Notifications: {
      screen: NotificationsStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <NotificationsTab size={20} color={tintColor} />
        ),
      },
    },
    Profile: {
      screen: createStackNavigator({Profile: ProfileScreen}),
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-person" size={20} color={tintColor} />
        ),
      },
    },
  },
  defaultsBottomTabNavigator,
);

const MainSwitch = createSwitchNavigator({
  Main: {screen: MainScreen},
  Login: {screen: LoginScreen},
  Home: {screen: BottomStack},
});

export default createAppContainer(MainSwitch);
