import React, {Component, Fragment} from 'react';
import {View, Text} from 'react-native';
import CardModel from '../models/card-model';
import {HeaderTitle} from '../components/shared/header';
import CardEditModal from '../components/cards/card-edit-modal';
import CardMoveToContactModal from '../components/cards/card-move-to-contact-modal';
import CardsService from '../services/cards-service';
import ContactsService from '../services/contacts-service';
import AlertsList from '../components/alerts/alerts-list';
import AlertsContext from '../contexts/alerts-context';
import CardActions from '../components/cards/card-actions';
import { BackButton } from '../components/shared/logo-top-bar';
import GradientContainerShaped from '../components/shared/gradient-container-shaped';
import ImageZoom from '../components/shared/image-zoom';

class CardScreen extends Component {
  static navigationOptions = {
    headerTransparent: true,
    headerLeft: args => <BackButton color="#fff" {...args} />,
    headerTitle: <Fragment />,
  };

  static contextType = AlertsContext;

  state = {
    card: new CardModel({}),
    displayEditModal: false,
    displayMoveToContactsModal: false,
    displayImageModal: false,
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

  onShowImagePress = () => {
    this.setState(state => ({displayImageModal: !state.displayImageModal}));
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
      displayImageModal,
      card,
      card: {firstName, lastName, email, phoneNumbers, websites, imageUrl},
    } = this.state;

    return (
      <>
        <AlertsList />
        <GradientContainerShaped>
          <HeaderTitle style={{color: '#eaeaea'}}>Your card informations</HeaderTitle>
          <View style={styles.cardInformations}>
            <View style={styles.bodyHeader}>
              <HeaderTitle>{firstName} {lastName}</HeaderTitle>
            </View>
            <View style={styles.bodyDescription}>
              <Text style={styles.bodyDescriptionText}>{email}</Text>
              <Text style={styles.bodyDescriptionText}>{phoneNumbers}</Text>
              <Text style={styles.bodyDescriptionText}>{websites}</Text>
            </View>
          </View>
        </GradientContainerShaped>
        <View style={styles.container}>
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
          { displayImageModal ? (
            <ImageZoom
              onClose={this.onShowImagePress}
              src={imageUrl}
            />
          ) : null}
          <CardActions
            moveToContact={this.onMoveToContactPress}
            edit={this.onEditPress}
            showImage={this.onShowImagePress}
          />
        </View>
      </>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    padding: 7,
  },
  cardInformations: {
    backgroundColor: '#fdfdfd',
    shadowColor: '#0c0c0c',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    padding: 25,
  },
  bodyHeader: {
    marginTop: 15,
    marginBottom: 15,
  },
  bodyDescriptionText: {
    color: '#777',
    fontSize: 12,
  },
};

export default CardScreen;
