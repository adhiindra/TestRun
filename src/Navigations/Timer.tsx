import {observer} from 'mobx-react-lite';
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {useStoreTodo} from '../TodoData';
import {clockify, formatDecimals, getDateSeconds} from '../utils/format';
import {displayNotifications, cancelNotification} from '../utils/notification';

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
    displayTime,
    setDisplayTime,
    title,
    setTitle,
    workingTime,
    restingTime,
    customTime,
    isPause,
    setIsPause,
    pauseTimer,
    setPauseTimer,
    notifTitle,
    setNotifTitle
  } = time;

  const startTimer = () => {
    let time = 0;
    if(isFirstStart){
      setNotifTitle('LETS GET REST!');
      setTitle('ON WORKING!');
      time = customTime? workingTime : 2500;
      setTimeStart(time);
    }else{
      setNotifTitle('LETS GO WORK!');
      setTitle('RESTING!');
      time = customTime? restingTime : 300;
      setTimeStart(time);
    }
  
    displayNotifications(notifTitle,time);
    setStartDate(getDateSeconds());
    setTimerOn(true);
  };

  const displayTimeWorking = () => {
    return setDisplayTime(customTime? workingTime : 2500);
  }

  const displayTimeResting = () => {
    return setDisplayTime(customTime? restingTime : 300);
  }

  const pauseTime = () => {
    setTimerOn(false);
    cancelNotification();
    setPauseTimer(startDate + timeStart - getDateSeconds())
    setIsPause(true);
  }

  const unPauseTime = () => {
    setTimerOn(true);
    setTimeStart(pauseTimer);
    setStartDate(getDateSeconds());
    displayNotifications(notifTitle, getDateSeconds() + pauseTimer - getDateSeconds());
    setIsPause(false);
  }


  const checkDone = () => {
    if (isFirstStart) {
      setIsFirstStart(false)
      setTitle('LETS GET REST!');
      displayTimeResting();
      setTimerOn(false);
    } else {
      setIsFirstStart(true);
      setTitle('LETS GO WORK!');
      displayTimeWorking();
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
            timerOn ? pauseTime() : isPause ? unPauseTime() : startTimer();
          }}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>{timerOn ? 'PAUSE' : 'START'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTimerOn(false);
            isFirstStart ? displayTimeWorking() : displayTimeResting()
            cancelNotification();
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
