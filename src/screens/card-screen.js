import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CardModel from '../models/card-model';
import {Header2} from '../components/shared/header';
import Icon from 'react-native-vector-icons/Ionicons';
import {colorPalette} from '../shared/styles';
import CardEditModal from '../components/cards/card-edit-modal';
import CardMoveToContactModal from '../components/cards/card-move-to-contact-modal';
import CardsService from '../services/cards-service';
import ContactsService from '../services/contacts-service';
import AlertsList from '../components/alerts/alerts-list';
import AlertsContext from '../contexts/alerts-context';

class CardScreen extends Component {
  static contextType = AlertsContext;

  state = {
    card: new CardModel({}),
    displayEditModal: false,
    displayMoveToContactsModal: false,
  };

  componentDidMount() {
    const {id} = this.props.navigation.state.params;

    CardsService.find(id).then(card => {
      this.setState({card});
    });
  }

  onSave = attributes => {
    const {
      state: {
        card,
        card: {id},
      },
      context: {pushMessage},
    } = this;

    card.assignAttributes(attributes);

    CardsService.update(id, card.toParams()).then(updatedCard => {
      this.setState({
        card: updatedCard,
        displayEditModal: false,
      });

      pushMessage({
        description: 'Saved!',
        type: 'popup',
      });
    });
  };

  onMoveToContactSave = attributes => {
    const {pushMessage} = this.context;

    ContactsService.create(attributes).then(() => {
      pushMessage({
        description: 'Moved!',
        type: 'popup',
      });
    });
  };

  onEditPress = () => {
    this.setState(state => ({displayEditModal: !state.displayEditModal}));
  };

  onMoveToContactPress = () => {
    this.setState(state => ({
      displayMoveToContactsModal: !state.displayMoveToContactsModal,
    }));
  };

  render() {
    const {
      displayEditModal,
      displayMoveToContactsModal,
      card,
      card: {id, firstName, lastName, email, phoneNumbers},
    } = this.state;

    return (
      <View style={styles.container}>
        <AlertsList />
        {displayEditModal ? (
          <CardEditModal
            onSave={this.onSave}
            card={card}
            close={this.onEditPress}
          />
        ) : null}
        {displayMoveToContactsModal ? (
          <CardMoveToContactModal
            onSave={this.onSave}
            card={card}
            close={this.onMoveToContactPress}
          />
        ) : null}
        <View style={styles.bodyContainer}>
          <View style={styles.bodyHeader}>
            <Header2>
              {firstName} {lastName}
            </Header2>
            <Icon name="ios-card" size={42} color={colorPalette.secondary} />
          </View>
          <View style={styles.bodyDescription}>
            <Text style={styles.bodyDescriptionText}>{email}</Text>
            <Text style={styles.bodyDescriptionText}>{phoneNumbers}</Text>
          </View>
        </View>
        <View style={styles.actionContainer}>
          <CardActions
            moveToContact={this.onMoveToContactPress}
            edit={this.onEditPress}
          />
        </View>
      </View>
    );
  }
}

// {id ? (
//   <>
//     <Button style={styles.button} onPress={this.onMoveToContactPress}>
//       Add to contacts
//     </Button>
//     <Button style={styles.button} onPress={this.onEditPress}>
//       Edit
//     </Button>
//   </>
// ) : null}

function CardActions({moveToContact, edit}) {
  return (
    <View style={actionStyles.container}>
      <TouchableOpacity style={actionStyles.item} onPress={edit}>
        <View style={actionStyles.icon}>
          <Icon name="ios-settings" color={color} size={26} />
        </View>
        <Text style={actionStyles.itemText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={actionStyles.item} onPress={moveToContact}>
        <View style={actionStyles.icon}>
          <Icon name="md-person-add" color={color} size={26} />
        </View>
        <Text style={actionStyles.itemText}>Move to contact</Text>
      </TouchableOpacity>
      <TouchableOpacity style={actionStyles.item}>
        <View style={actionStyles.icon}>
          <Icon name="ios-image" color={color} size={26} />
        </View>
        <Text style={actionStyles.itemText}>Show Image</Text>
      </TouchableOpacity>
    </View>
  );
}

const color = '#444';

const actionStyles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  itemText: {
    fontSize: 11,
    color: color,
  },
  icon: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 15,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
};

const styles = {
  container: {
    flex: 1,
    padding: 7,
    backgroundColor: colorPalette.backgroundColor,
  },
  bodyContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
    shadowColor: '#0c0c0c',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    borderRadius: 12,
  },
  bodyHeader: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15,
  },
  bodyDescriptionText: {
    color: '#777',
  },
  actionContainer: {
    borderRadius: 12,
    marginTop: 12,
    padding: 15,
    flex: 2,
    backgroundColor: '#fff',
    shadowColor: '#0c0c0c',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
  },
  button: {
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
    padding: 16,
    color: '#555',
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
  },
};

export default CardScreen;
