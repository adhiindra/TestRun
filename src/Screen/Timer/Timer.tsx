import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useStoreTodo } from '../../Model/TodoData';
import {clockify, formatDecimals, getDateSeconds} from '../../utils/format';
import {displayNotifications, cancelNotification} from '../../utils/notification';

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
    progValue,
    setProgValue,
  } = time;

  const displayTimeWorking = () => {
    return setDisplayTime(customTime ? workingTime : 1500);
  };

  const displayTimeResting = () => {
    return setDisplayTime(customTime ? restingTime : 300);
  };

  const startTimer = () => {
    let time = 0;
    if (isFirstStart) {
      setTitle('ON WORKING!');
      time = customTime ? workingTime : 1500;
      setTimeStart(time);
    } else {
      setTitle('RESTING!');
      time = customTime ? restingTime : 300;
      setTimeStart(time);
    }

    displayNotifications(
      isFirstStart ? 'LETS GET REST!' : 'LETS GO WORK!',
      time,
    );
    setProgValue(time);
    setStartDate(getDateSeconds());
    setTimerOn(true);
  };

  const resetTimer = () => {
    setTimerOn(false);
    setIsFirstStart(true);
    displayTimeWorking();
    setTitle('LETS GO WORK!');
    setProgValue(customTime ? workingTime : 1500);
    cancelNotification();
  };

  const pauseTime = () => {
    setTimerOn(false);
    cancelNotification();
    setPauseTimer(startDate + timeStart - getDateSeconds());
    setIsPause(true);
  };

  const unPauseTime = () => {
    setTimerOn(true);
    setTimeStart(pauseTimer);
    setStartDate(getDateSeconds());
    displayNotifications(
      isFirstStart ? 'LETS GET REST!' : 'LETS GO WORK!',
      getDateSeconds() + pauseTimer - getDateSeconds(),
    );
    setIsPause(false);
  };

  const checkDone = () => {
    if (isFirstStart) {
      setIsFirstStart(false);
      setTitle('LETS GET REST!');
      displayTimeResting();
      setProgValue(customTime ? restingTime : 300);
      console.log(customTime, progValue, workingTime, isFirstStart);
    } else {
      setIsFirstStart(true);
      setTitle('LETS GO WORK!');
      displayTimeWorking();
      setProgValue(customTime ? workingTime : 1500);
      console.log(customTime, progValue, restingTime, isFirstStart);
    }

    setTimerOn(false);
  };

  useEffect(() => {
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
      // console.log(startDate + timeStart - getDateSeconds());
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
            marginBottom: 0,
          }}>
          <View style={{position: 'absolute'}}>
            <Text style={styles.timer}>
              {displayHours}:{displayMins}:{displaySecs}
            </Text>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Text style={{fontWeight: 'bold', color: 'white', fontSize: 20}}>
                {title}
              </Text>
            </View>
          </View>
          <CircularProgress
            value={displayTime}
            radius={140}
            duration={1000}
            activeStrokeColor={'darkorange'}
            showProgressValue={false}
            maxValue={progValue}
          />
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 40,
          }}>
          <TouchableOpacity
            onPress={() => {
              resetTimer();
            }}>
            <View style={[styles.btn, {borderColor: 'grey'}]}>
              <View style={[styles.btn_inside, {backgroundColor: 'grey'}]}>
                <Text style={[styles.btnText, {color: 'white'}]}>RESET</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              timerOn ? pauseTime() : isPause ? unPauseTime() : startTimer();
            }}>
            <View
              style={[
                styles.btn,
                {borderColor: timerOn ? 'darkorange' : 'green'},
              ]}>
              <View
                style={[
                  styles.btn_inside,
                  {backgroundColor: timerOn ? 'darkorange' : 'green'},
                ]}>
                <Text style={styles.btnText}>
                  {timerOn ? 'PAUSE' : isPause ? 'RESUME' : 'START'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
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
    color: 'darkorange',
    fontSize: 43,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  btn: {
    width: 110,
    height: 110,
    alignItems: 'center',
    borderColor: 'orange',
    justifyContent: 'center',
    borderWidth: 3,
    borderRadius: 100,
  },
  btn_inside: {
    width: 95,
    height: 95,
    alignItems: 'center',
    backgroundColor: 'darkgreen',
    justifyContent: 'center',
    borderRadius: 100,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
export default Timer;
