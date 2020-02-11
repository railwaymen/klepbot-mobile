import React, {Component, Fragment} from 'react';
import {ScrollView, Animated} from 'react-native';
import ContactModel from '../models/contact-model';
import ContactsService from '../services/contacts-service';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../shared/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../components/shared/button';
import Loading from '../components/shared/loading';
import ContactDescription from '../components/contact/contact-description';
import {BackButton} from '../components/shared/logo-top-bar';
import MountedModal from '../components/shared/mounted-modal';
import ContactEdit from '../components/contact/contact-edit';
import ContactComposeEmail from '../components/contact/contact-compose-email';
import ContactCreateTask from '../components/contact/contact-create-task';
import AlertsList from '../components/alerts/alerts-list';
import AlertsContext from '../contexts/alerts-context';

class ContactScreen extends Component {
  static navigationOptions = {
    headerTransparent: true,
    headerLeft: args => <BackButton color="#fff" {...args} />,
    headerTitle: () => <Fragment />,
  };

  static contextType = AlertsContext;

  state = {
    contact: new ContactModel({}),
    isEditContact: false,
    isEmailCompose: false,
    isMoveToNextStatus: false,
    isShowHistory: false,
    isTaskCreate: false,
    animate: {
      bodyMargin: new Animated.Value(345),
      headerOpacity: new Animated.Value(0),
    },
  };

  componentDidMount() {
    const {id} = this.props.navigation.state.params;

    ContactsService.find(id)
      .then(contact => {
        this.setState({contact, isLoading: false});
      })
      .then(() => {
        this.animate();
      });
  }

  animate = () => {
    const {bodyMargin, headerOpacity} = this.state.animate;

    Animated.sequence([
      Animated.timing(bodyMargin, {
        duration: 300,
        toValue: 0,
      }),
      Animated.timing(headerOpacity, {
        duration: 1000,
        toValue: 1,
      }),
    ]).start();
  };

  onModalToggle = name => {
    const nameWithPrefix = `is${name}`;

    this.setState(state => ({
      [nameWithPrefix]: !state[nameWithPrefix],
    }));
  };

  emailComposeToggle = () => this.onModalToggle('EmailCompose');
  editContactToggle = () => this.onModalToggle('EditContact');
  moveToNextStatusToggle = () => this.onModalToggle('MoveToNextStatus');
  showHistoryToggle = () => this.onModalToggle('ShowHistory');
  taskCreateToggle = () => this.onModalToggle('TaskCreate');

  render() {
    const {
      contact,
      isLoading,
      isEditContact,
      isEmailCompose,
      isTaskCreate,
      animate: {bodyMargin, headerOpacity},
    } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <LinearGradient
        colors={colors}
        start={{x: 0, y: -1}}
        end={{x: 1, y: 1}}
        style={styles.container}>
        <AlertsList />
        <MountedModal visible={isEditContact}>
          <ContactEdit
            {...contact}
            onSave={this.onSave}
            close={this.editContactToggle}
          />
        </MountedModal>
        <MountedModal visible={isEmailCompose}>
          <ContactComposeEmail
            contact={contact}
            close={this.emailComposeToggle}
          />
        </MountedModal>
        <MountedModal visible={isTaskCreate}>
          <ContactCreateTask
            contactId={contact.id}
            close={this.taskCreateToggle}
          />
        </MountedModal>
        <Animated.View style={[styles.header, {opacity: headerOpacity}]}>
          <ContactDescription {...contact} />
        </Animated.View>
        <Animated.View style={[styles.body, {marginTop: bodyMargin}]}>
          <ScrollView>
            <Button
              icon="ios-add"
              onPress={this.emailComposeToggle}
              style={styles.button}>
              Compose an email
            </Button>
            <Button
              icon="ios-create"
              onPress={this.editContactToggle}
              style={styles.button}>
              Edit contact
            </Button>
            {/* <Button icon="ios-color-wand" onPress={this.moveToNextStatusToggle} style={styles.button}>
              <Icon size={26} />
              Move to next status
            </Button> */}
            {/* <Button icon="ios-document" onPress={this.showHistoryToggle} style={styles.button}>
              <Icon size={26} />
              View history
            </Button> */}
            <Button
              icon="ios-git-network"
              onPress={this.taskCreateToggle}
              style={styles.button}>
              <Icon size={26} />
              Create task
            </Button>
          </ScrollView>
        </Animated.View>
      </LinearGradient>
    );
  }
}

const styles = {
  container: {
    paddingTop: 94,
    flex: 1,
  },
  header: {
    flex: 2,
  },
  body: {
    flex: 2,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  button: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#111',
  },
};

export default ContactScreen;
