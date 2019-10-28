import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import HomeScreen from '../screens/home-screen';
import LoginScreen from '../screens/login-screen';
import PhotoScreen from '../screens/photo-screen';
import FirstScreen from '../screens/first-screen';

const LoginSwitches = createSwitchNavigator({
  Login: {
    screen: LoginScreen,
  },
});

const MainStack = createStackNavigator({
  First: {
    screen: FirstScreen,
  },
  Photo: {
    screen: PhotoScreen,
  },
});

const MainScreen = createBottomTabNavigator({
  Photo: MainStack,
});

const AppNavigator = createSwitchNavigator({
  Home: {
    screen: HomeScreen,
  },
  Login: {
    screen: LoginSwitches,
  },
  Main: {
    screen: MainScreen,
  },
});

export default createAppContainer(AppNavigator);
