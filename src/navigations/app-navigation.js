import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import HomeScreen from '../screens/home-screen';
import LoginScreen from '../screens/login-screen';

const LoginSwitches = createSwitchNavigator({
  Login: {
    screen: LoginScreen,
  },
});

const AppNavigator = createSwitchNavigator({
  Home: {
    screen: HomeScreen,
  },
  Login: {
    screen: LoginSwitches,
  },
});

export default createAppContainer(AppNavigator);
