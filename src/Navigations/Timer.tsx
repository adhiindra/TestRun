import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Timer = () => {
  const hoursMinSecs = {hours: 0, minutes: 25, seconds: 0};
  const {hours = 0, minutes = 0, seconds = 60} = hoursMinSecs;
  const [[hrs, mins, secs], setTime] = React.useState([
    hours,
    minutes,
    seconds,
  ]);

  const tick = () => {
    if (hrs === 0 && mins === 0 && secs === 0) {
      Alert.alert('Finish');
      reset();
    } else if (mins === 0 && secs === 0) {
      setTime([hrs - 1, 59, 59]);
    } else if (secs === 0) {
      setTime([hrs, mins - 1, 59]);
    } else {
      setTime([hrs, mins, secs - 1]);
    }
  };

  const reset = () => setTime([hours, minutes, seconds]);

  React.useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return (
    <View style={styles.canvas}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 100,
        }}>
        <Text style={styles.timer}>
          {hrs}:{mins}:{secs}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 50,
        }}>
        <TouchableOpacity>
          <View style={styles.btn}>
            <Text style={styles.btnText}>START</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.btn}>
            <Text style={styles.btnText}>STOP</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  canvas: {
    justifyContent: 'space-evenly',
    height: '100%',
    backgroundColor: '#36393F',
  },
  timer: {
    color: 'orange',
    fontSize: 40,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  btn: {
    padding: 20,
    width: 100,
    height: 100,
    alignItems: 'center',
    borderColor: 'orange',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 100,
  },
  btnText: {
    color: 'orange',
    fontWeight: 'bold',
  },
});
export default Timer;
