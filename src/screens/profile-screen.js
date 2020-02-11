import React, {Component} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import UsersService from '../services/users-service';
import UserModel from '../models/user-model';
import ProfileStats from '../components/profile/profile-stats';
import ProfileGraph from '../components/profile/profile-graph';
import ProfileSettingsModal from '../components/profile/profile-settings-modal';
import CurrentUser from '../helpers/current-user';
import {colors} from '../shared/styles';
import {NavButton} from '../components/shared/logo-top-bar';
import {unauthorized} from '../shared/actions';
import AlertsList from '../components/alerts/alerts-list';
import AlertsContext from '../contexts/alerts-context';

class ProfileScreen extends Component {
  static contextType = AlertsContext;

  static navigationOptions = ({navigation: {getParam}}) => ({
    headerLeft: () => (
      <NavButton
        icon="ios-refresh"
        color="#fff"
        onPress={getParam('fetchUser')}
      />
    ),
    headerRight: () => (
      <NavButton
        icon="ios-settings"
        color="#fff"
        onPress={getParam('toggleSettingsModal')}
      />
    ),
    headerTransparent: true,
  });

  state = {
    user: new UserModel({}),
    displaySettings: false,
  };

  componentDidMount() {
    const {
      fetchUser,
      toggleSettingsModal,
      props: {
        navigation: {setParams},
      },
    } = this;

    fetchUser();

    setParams({
      fetchUser,
      toggleSettingsModal,
    });
  }

  fetchUser = () => {
    UsersService.currentUser()
      .then(user => {
        this.setState({user});
      })
      .catch(() => {
        const {navigation} = this.props;

        unauthorized({navigation});
      });
  };

  toggleSettingsModal = () => {
    this.setState(state => ({displaySettings: !state.displaySettings}));
  };

  onLogOut = async () => {
    await CurrentUser.destroy();

    const {navigate} = this.props.navigation;

    navigate('Main');
  };

  saveUser = attributes => {
    let {
      state: {user},
      context: {pushMessage},
    } = this;
    user.assignAttributes(attributes);

    const form = user.toDataForm();

    UsersService.currentUserUpdate(form).then(fetchedUser => {
      this.setState({user: fetchedUser, displaySettings: false});
      pushMessage({description: 'Saved!', type: 'popup'});
    });
  };

  render() {
    const {
      user,
      user: {firstName, lastName, avatarUrl, report},
      displaySettings,
    } = this.state;

    return (
      <View style={styles.container}>
        <AlertsList />
        {displaySettings ? (
          <ProfileSettingsModal
            close={this.toggleSettingsModal}
            visible={displaySettings}
            saveUser={this.saveUser}
            onLogOut={this.onLogOut}
            user={user}
          />
        ) : null}
        <LinearGradient
          start={{x: 0, y: -1}}
          end={{x: 1, y: 1}}
          colors={colors}
          style={styles.profileHeader}>
          <Image style={styles.profileHeaderImage} source={{uri: avatarUrl}} />
          <View style={styles.profileDescription}>
            <Text style={styles.profileDescriptionText}>
              {firstName} {lastName}
            </Text>
          </View>
        </LinearGradient>
        <ScrollView style={styles.profileBody}>
          <ProfileStats colors={colors} />
          <ProfileGraph {...report} colors={colors} />
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  profileHeader: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileHeaderImage: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 3,
    borderColor: 'rgba(135,75,235,0.5)',
    position: 'absolute',
  },
  profileDescription: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 18,
  },
  profileDescriptionText: {
    fontSize: 24,
    color: '#fafafa',
  },
  profileBody: {
    flex: 1,
    padding: 12,
  },
};

export default ProfileScreen;
