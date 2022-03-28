import {TextInput} from '@react-native-material/core';
import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useStoreTodo} from '../TodoData';
import { setNotificationsPermission } from '../utils/notification';

const Login = ({navigation}: {navigation: any}) => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const {logins} = useStoreTodo();
  const {isLogin, setIsLogin, setEmail} = logins;

  setNotificationsPermission();

  React.useEffect(() => {
    isLogin ? navigation.navigate('TodoList') : {};
  });

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={{flex: 1, justifyContent: 'center', marginHorizontal: 55}} behavior={Platform.OS === "ios" ? "padding" : "height"} enabled>
        <View >
          <TextInput
            placeholder="Email"
            variant="outlined"
            onChangeText={inputEmail => setInputEmail(inputEmail)}
          />
          <TextInput
            placeholder="Password"
            variant="outlined"
            secureTextEntry={true}
            style={{marginVertical: 10}}
            onChangeText={inputPassword => setInputPassword(inputPassword)}
          />
          <View style={{width: 130}}>
            <TouchableOpacity style={styles.btn} onPress={checkEmail}>
              <Text style={styles.btnText}>Log In</Text>
              <Icon name="arrow-right" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );

  function checkEmail() {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let phoneNumberLength = inputPassword.length;

    if (!regEmail.test(inputEmail)) {
      return Alert.alert('Invalid Email');
    } else if (phoneNumberLength <= 6) {
      return Alert.alert('Invalid Password');
    } else {
      return (
        setIsLogin(true),
        setEmail(inputEmail.split('@')[0].toString()),
        navigation.navigate('TodoList')
      );
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#36393F',
  },
  textInput: {
    width: 200,
    padding: 15,
    textAlign: 'center',
  },
  btnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  btn: {
    backgroundColor: '#01c853',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default Login;
