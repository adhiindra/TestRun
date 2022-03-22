import {observer} from 'mobx-react-lite';
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {useStoreTodo} from '../TodoData';
import {clockify, formatDecimals, getDateSeconds} from '../utils/format';
import {displayNotifications} from '../utils/notification';

const Timer = observer(() => {
  const {time} = useStoreTodo();
  const {
    setTimeStart,
    timeStart,
    timerOn,
    setTimerOn,
    setStartDate,
    startDate,
    isFirstStart,
    setIsFirstStart,
    
  } = time;
  const [displayTime, setDisplayTime] = useState(0);
  const [title, setTitle] = useState('LETS GO WORK!');

  const startTimer = () => {
    let body = '';
    let time = 0;
    if(isFirstStart){
      body = 'LETS GET REST!';
      setTitle('ON WORKING!');
      time = 100;
      setTimeStart(100);
    }else{
      body = 'LETS GET WORK!';
      setTitle('RESTING!');
      time = 200;
      setTimeStart(200);
    }
  
    displayNotifications(body,time);
    setStartDate(getDateSeconds());
    setTimerOn(true);
  };

  const checkDone = () => {
    if (isFirstStart) {
      setIsFirstStart(false)
      setTitle('LETS GET REST!');
      setTimerOn(false);
    } else {
      setIsFirstStart(true);
      setTitle('LETS GET WORK!');
      setTimerOn(false);
    }
  }

  React.useEffect(() => {
    const timeDate = setInterval(() => {
      if (
        timerOn &&
        formatDecimals(startDate + timeStart - getDateSeconds()) >= 0
      ) {
        setDisplayTime(
          formatDecimals(startDate + timeStart - getDateSeconds()),
        );
      } else {
        if (timerOn) {
          checkDone();
        }
        // clearInterval(timeDate);
      }
      console.log(startDate + timeStart - getDateSeconds());
    }, 1000);

    return () => clearInterval(timeDate);
  }, [timerOn, startDate]);

  const {displayHours, displayMins, displaySecs} = clockify(displayTime);

  return (
    <View style={styles.canvas}>
      <View>
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
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
          }}>
          <Text style={{fontWeight: 'bold', color: 'orange', fontSize: 25}}>
            {title}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 50,
        }}>
        <TouchableOpacity
          onPress={() => {
            timerOn ? setTimerOn(false) : startTimer();
          }}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>{timerOn ? 'PAUSE' : 'START'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTimerOn(false);
            setIsFirstStart(true);
          }}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>RESET</Text>
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
