import {TextInput} from '@react-native-material/core';
import { observer } from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { useStoreTodo } from '../../Model/TodoData';

const RegisterUser = observer(({navigation}: {navigation: any}) => {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const {login} = useStoreTodo();
  const {fetchingRegister,registerUser} = login;

  return (
    <View style={styles.container}>
      {fetchingRegister && <Spinner visible={true} textContent={'Registering...'} textStyle={{color:'white'}}/>}
      <KeyboardAvoidingView style={{flex: 1, justifyContent: 'center', marginHorizontal: 55}} behavior={Platform.OS === "ios" ? "padding" : "height"} enabled>
        <View >
        <TextInput
            placeholder="Name"
            variant="outlined"
            style={{marginVertical: 10}}
            onChangeText={inputName => setInputName(inputName)}
          />
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
              <Text style={styles.btnText}>Register</Text>
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
        registerUser(inputName,inputEmail,inputPassword)
      );
    }
  }
});

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
    backgroundColor: 'blue',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default RegisterUser;
