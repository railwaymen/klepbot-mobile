import CardsService from '../services/cards-service';
import ContactModel from './contact-model';
import {DEFAULT_URL} from 'react-native-dotenv';

class CardModel {
  constructor({
    id,
    first_name,
    last_name,
    email,
    body,
    metadata,
    phone_numbers,
    websites,
    possible_names,
    image_url,
  }) {
    this.id = id;
    this.firstName = first_name || '';
    this.lastName = last_name || '';
    this.email = email;
    this.body = body || '';
    this.metadata = metadata;
    this.phoneNumbers = phone_numbers;
    this.websites = websites;
    this.possibleNames = possible_names || [];
    this.imageUrl = `${DEFAULT_URL}${image_url}`;
  }

  assignAttributes = attributes => {
    Object.keys(attributes).forEach(attribute => {
      this[attribute] = attributes[attribute];
    });
  };

  toContact = () => {
    return new ContactModel({
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      phone_numbers: this.phoneNumbers,
      websites: this.websites,
    });
  }

  toParams = () => {
    return {
      body: this.body,
      first_name: this.firstName,
      last_name: this.lastName,
    };
  };

  update = attributes => {
    Object.keys(attributes).forEach(attribute => {
      this[attribute] = attributes[attribute];
    });

    return CardsService.update(this.id, this.toParams()).then(() => {
      return this;
    });
  };

  status = () => {
    if ([undefined, null, ''].includes(this.body)) {
      return 'pending';
    } else {
      return 'ready';
    }
  };

  replaceAttributesForEmailTemplate = template => {
    let resolvedTempalte = template;

    ['firstName', 'lastName', 'email'].forEach(word => {
      resolvedTempalte = resolvedTempalte.replace(`{{${word}}}`, this[word]);
    });

    return resolvedTempalte;
  };
}

export default CardModel;
