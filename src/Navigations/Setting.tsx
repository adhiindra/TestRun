import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Switch, TextInput} from 'react-native-paper';
import {useStoreTodo} from '../TodoData';
import { secToMins } from '../utils/format';

const Setting = ({navigation}: {navigation: any}) => {
  const {time} = useStoreTodo();
  const {
    workingTime,
    setWorkingTime,
    restingTime,
    setRestingTime,
    customTime,
    setCustomTime,
  } = time;
  const [inWorkingTime, setInWorkingTime] = useState(workingTime.toString());
  const [inRestingTime, setInRestingTime] = useState(restingTime.toString());
  const [isEnabled, setIsEnabled] = useState(customTime);
  const toggleSwitch = () => {
    setCustomTime(!customTime);
    setIsEnabled(!isEnabled);
  };
  const saveSetting = () => {
    setWorkingTime(Math.floor(parseInt(inWorkingTime) * 60));
    setRestingTime(Math.floor(parseInt(inRestingTime) * 60));
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
                  backgroundColor: 'rgba(0,0,0,0.0)', // 40% opaque
                  width: 70,
                  height: 30,
                  textAlign: 'center',
                }}
                keyboardType={'numeric'}
                onChangeText={inWorkingTime => setInWorkingTime(inWorkingTime)}
                placeholder={secToMins(inWorkingTime)}
              />
            </View>
            {/* isi disini test */}
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
                  backgroundColor: 'rgba(0,0,0,0.0)', // 40% opaque
                  width: 70,
                  height: 30,
                  textAlign: 'center',
                }}
                keyboardType={'numeric'}
                onChangeText={inRestingTime => setInRestingTime(inRestingTime)}
                placeholder={secToMins(inRestingTime)}
              />
            </View>
            {/* test isi disini */}
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

  function Logout() {
    return navigation.navigate('Login');
  }
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
