//import ApiService from './api-service';
import UserModel from '../models/user-model';

class UsersService {
  static async signIn({email, password}) {
    // const body = {
    //   email,
    //   password,
    // }

    // return ApiService.post({
    //   url: 'authentications',
    //   body: JSON.stringify(body),
    // }).then((attributes) => {
    //   return new UserModel(attributes);
    // })
    if (email === 'admin@example.com' || password === 'password1') {
      return new UserModel({
        authentication_token: 'siemanko',
        id: 1,
        email: email,
      });
    }
    return new UserModel({});
  }
}

export default UsersService;
