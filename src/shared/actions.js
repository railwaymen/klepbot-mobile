import {StackActions} from 'react-navigation';
import CurrentUser from '../helpers/current-user';

export async function unauthorized({navigation}) {
  await CurrentUser.destroy();

  const resetAction = StackActions.reset({
    index: 0,
  });

  navigation.navigate('Main');

  navigation.dispatch(resetAction);
}
