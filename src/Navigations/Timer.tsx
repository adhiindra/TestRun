import {observer} from 'mobx-react-lite';
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import {useStoreTodo} from '../TodoData';
import {clockify, formatDecimals, getDateSeconds} from '../utils/format';

const Timer = observer(() => {
  const {time} = useStoreTodo();
  const {
    setTimeStart,
    timeStart,
    timerOn,
    setTimerOn,
    setStartDate,
    startDate,
  } = time;
  const [displayTime, setDisplayTime] = useState(0);

  React.useEffect(() => {
    const timeDate = setInterval(() => {
      if (
        timerOn &&
        formatDecimals(startDate + timeStart - getDateSeconds()) >= 0
      ) {
        console.log(startDate + timeStart - getDateSeconds());
        setDisplayTime(
          formatDecimals(startDate + timeStart - getDateSeconds()),
        );
      } else {
        clearInterval(timeDate);
      }
      console.log(startDate + timeStart - getDateSeconds());
    }, 1000);

    return () => clearInterval(timeDate);
  }, [timerOn, startDate]);

  const {displayHours, displayMins, displaySecs} = clockify(displayTime);

  return (
    <View style={styles.canvas}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 100,
        }}>
        <Text style={styles.timer}>
          {displayHours}:{displayMins}:{displaySecs}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 50,
        }}>
        <TouchableOpacity
          onPress={() => {
            setStartDate(getDateSeconds());
            setTimerOn(true);
          }}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>START</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTimerOn(false);
            setTimeStart(10);
          }}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>STOP</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
});

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
