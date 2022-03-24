import React, {useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Switch, TextInput} from 'react-native-paper';
import {useStoreTodo} from '../TodoData';
import {secToMins} from '../utils/format';

const Setting = ({navigation}: {navigation: any}) => {
  const {time, logins} = useStoreTodo();
  const {
    workingTime,
    setWorkingTime,
    restingTime,
    setRestingTime,
    customTime,
    setCustomTime,
  } = time;
  const {setIsLogin} = logins;
  const [inWorkingTime, setInWorkingTime] = useState(secToMins(workingTime.toString()));
  const [inRestingTime, setInRestingTime] = useState(secToMins(restingTime.toString()));
  const [isEnabled, setIsEnabled] = useState(customTime);
  const toggleSwitch = () => {
    setCustomTime(!customTime);
    setIsEnabled(!isEnabled);
  };
  const saveSetting = () => {
    return Alert.alert(
      'Timer Setting',
      'Are you sure want to save this setting ?',
      [
        {
          text: 'Cancel',
          onPress: () => {console.log(inWorkingTime, inRestingTime)},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setWorkingTime(Math.floor(parseInt(inWorkingTime) * 60));
            setRestingTime(Math.floor(parseInt(inRestingTime) * 60));
          },
        },
      ],
    );
  };

  const Logout = () => {
    return Alert.alert(
      'TodoList Apps',
      'Are you sure want to Logout ?',
      [
        {
          text: 'OK',
          onPress: () => {
            setIsLogin(false), navigation.navigate('Login');
          },
        },
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        
      ],
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps={'never'}>
        <View style={{marginBottom: 150}}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 25,
              marginBottom: 20,
            }}>
            Timer
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontWeight: '400', fontSize: 19}}>
              Custom Timer
            </Text>
            <Switch
              trackColor={{false: '#767577', true: '#01c853'}}
              thumbColor={'white'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={customTime}
            />
          </View>
          <View style={styles.divider} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontWeight: '400', fontSize: 17}}>
              Set Working Time (Minutes)
            </Text>
            <View style={{backgroundColor: 'transparent'}}>
              <TextInput
                style={{
                  backgroundColor: 'rgba(0,0,0,0.0)',
                  width: 70,
                  height: 30,
                  textAlign: 'center',
                }}
                keyboardType={'numeric'}
                onChangeText={inWorkingTime => setInWorkingTime(inWorkingTime)}
                defaultValue={inWorkingTime}
              />
            </View>
          </View>
          <View style={styles.divider} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontWeight: '400', fontSize: 17}}>
              Set Resting Time (Minutes)
            </Text>
            <View style={{backgroundColor: 'transparent'}}>
              <TextInput
                style={{
                  backgroundColor: 'rgba(0,0,0,0.0)',
                  width: 70,
                  height: 30,
                  textAlign: 'center',
                }}
                keyboardType={'numeric'}
                onChangeText={inRestingTime => setInRestingTime(inRestingTime)}
                defaultValue={inRestingTime}
              />
            </View>
          </View>
          <View style={styles.divider} />
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={[styles.btn, {backgroundColor: 'blue'}]}
            onPress={saveSetting}>
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={Logout}>
            <Text style={styles.btnText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 10,
    backgroundColor: '#36393F',
  },
  btnText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: '#C33939',
    borderRadius: 10,
    width: 160,
    marginTop: 10,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 15,
  },
  timepicker: {
    justifyContent: 'center',
  },
  timepicker_ios: {
    width: 90,
    justifyContent: 'center',
  },
});

export default Setting;
