import { Api } from '@env';
import axios from 'axios';
import {flow, types} from 'mobx-state-tree';
import {Alert} from 'react-native';

export const initialLogin = {
  email: '',
  fetchingLogin: false,
  fetchingRegister: false,
};

export const Login = types
  .model({
    email: types.string,
    token: types.maybeNull(types.string),
    fetchingLogin: types.boolean,
    fetchingRegister: types.boolean,
  })
  .actions(self => ({
    setLogout: () => {
      self.email = '';
      self.token = null;
    },
    registerUser: flow(function* registerUser(
      name: string,
      email: string,
      pass: string,
    ) {
      try {
        self.fetchingRegister = true;
        const res = yield axios.post(
          `${Api}/api/users`,
          {
            name: name,
            email: email,
            password: pass,
            role: 0,
          },
        );
        
        res.status == 200 ? Alert.alert('Register Account Success') : {};
        self.fetchingRegister = false;
      } catch (error) {
        Alert.alert(error.response.data.message);
        Alert.alert(error.response.status);
        self.fetchingRegister = false;
      }
    }),
    getLogin: flow(function* getLogin(email: string, pass: string) {
      self.token = null;
      self.fetchingLogin = true;
      try {
        const res = yield axios.post(
          `${Api}/api/login`,
          {
            email: email,
            password: pass,
          },
        );
        self.fetchingLogin = false;
        self.token = res.data.token;
        self.email = email.split('@')[0];
      } catch (error) {
        Alert.alert(error.response.data.message);
        console.log(error.response.status);
        self.fetchingLogin = false;
      }
    }),
  }));
