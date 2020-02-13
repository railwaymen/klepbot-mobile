import {DEFAULT_URL} from 'react-native-dotenv';
import DataPeriodModel from './data-period-model';

class UserModel {
  constructor({
    id,
    first_name,
    last_name,
    email,
    token,
    avatar_url,
    color,
    signature,
    report = {},
    contacts_count = 0,
    cards_count = 0,
  }) {
    this.id = id;
    this.firstName = first_name;
    this.lastName = last_name;
    this.email = email;
    this.token = token;
    this.avatarUrl = `${DEFAULT_URL}/${avatar_url}` || `${DEFAULT_URL}/temp-image.png`;
    this.color = color || '#FF9A7B';
    this.signature = signature;

    this.report = new DataPeriodModel(report);
    this.contactsCount = contacts_count;
    this.cardsCount = cards_count;

    this.fullName = `${this.firstName} ${this.lastName}`;
  }

  assignAttributes = attributes => {
    Object.keys(attributes).forEach(attribute => {
      this[attribute] = attributes[attribute];
    });
  };

  attachFile = file => {
    this.file = file;
  };

  toDataForm = () => {
    const form = new FormData();
    const params = this.toParams();

    Object.keys(params).map(key => {
      form.append(`user[${key}]`, params[key]);
    });

    if (this.file) {
      form.append('user[avatar]', this.file);
    }

    return form;
  };

  toParams = () => ({
    first_name: this.firstName,
    last_name: this.lastName,
    email: this.email,
    color: this.color,
    signature: this.signature,
  });
}

export default UserModel;
