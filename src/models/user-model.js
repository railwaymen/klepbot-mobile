class UserModel {
  constructor(attributes) {
    this.id = attributes.id;
    this.email = attributes.email;
    this.username = attributes.username;

    this.token = attributes.authentication_token;
  }
}

export default UserModel;
