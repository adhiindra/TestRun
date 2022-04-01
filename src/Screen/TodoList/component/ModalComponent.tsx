import {TextInput, Button} from '@react-native-material/core';
import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useStoreTodo } from '../../../Model/TodoData';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

const ModalComponent = () => {
  const [title, setTitle] = useState('');
  const {addTodo} = useStoreTodo();
  const [datenow, setDatenow] = useState(new Date(Date.now()));

  const [isModalVisible, setModalVisible] = useState(false);
  const [isDateVisible, setDateVisible] = useState(false);
  const [isTimeVisible, setTimeVisible] = useState(false);
  
  const onChangeDate = (event, value) => {
    setDatenow(value);
    if (Platform.OS === 'android') {
      setDateVisible(false);
    }
  };

  const onChangeTime = (event, value) => {
    setDatenow(value);
    if (Platform.OS === 'android') {
      setTimeVisible(false);
    }
  };

  const toggleModal = () => {
    setTitle('');
    setDatenow(new Date(Date.now()));
    setModalVisible(!isModalVisible);
  };

  const toggleDate = () => {
    setDateVisible(true);
  };

  const toggleTime = () => {
    setTimeVisible(true);
  };

  const addData = () => {
    let dateFormat: string = dayjs(datenow).format('DD/MM/YYYY').toString();
    let timeFormat: string = dayjs(datenow).format('h:mm').toString();
    addTodo(title, datenow, 'OPEN');
    toggleModal();
  };

  return (
    <View>
      <TouchableOpacity style={styles.floatingBtn} onPress={toggleModal}>
        <Icon name="plus" size={25} color="#36393F" />
      </TouchableOpacity>
      <Modal isVisible={isModalVisible} avoidKeyboard={true}>
        <View
          style={{
            height: 300,
            backgroundColor: '#36393F',
            padding: 25,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: 'white',
              fontSize: 20,
              marginBottom: 40,
            }}>
            Add New List
          </Text>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TextInput
              placeholder="Title"
              variant="outlined"
              onChangeText={title => setTitle(title)}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
                {' '}
                Select Date :
              </Text>
              {Platform.OS === 'android' && (
                <View style={{flexDirection:"row"}}>
                  <TouchableOpacity onPress={toggleDate} style={{marginRight:5}}>
                    {isDateVisible && (
                      <View style={styles.timepicker}>
                        <DateTimePicker
                          value={datenow}
                          mode={'date'}
                          minimumDate={new Date()}
                          display={'default'}
                          themeVariant={'dark'}
                          onChange={onChangeDate}
                        />
                      </View>
                    )}
                    <View
                      style={{
                        backgroundColor: '#40444B',
                        paddingHorizontal: 8,
                        paddingVertical: 5,
                        borderRadius: 8,
                      }}>
                      <Text style={{color: 'white', fontSize: 15}}>
                        {dayjs(datenow).format('MM/DD/YYYY')}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={toggleTime}>
                    {isTimeVisible && (
                      <View style={styles.timepicker}>
                        <DateTimePicker
                          value={datenow}
                          mode={'time'}
                          minimumDate={new Date()}
                          display={'default'}
                          themeVariant={'dark'}
                          onChange={onChangeTime}
                        />
                      </View>
                    )}
                    <View
                      style={{
                        backgroundColor: '#40444B',
                        paddingHorizontal: 8,
                        paddingVertical: 5,
                        borderRadius: 8,
                      }}>
                      <Text style={{color: 'white', fontSize: 15}}>
                        {dayjs(datenow).format('hh:mm A')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              {Platform.OS === 'ios' && (
                <View style={styles.timepicker_ios}>
                  <DateTimePicker
                    value={datenow}
                    mode={'datetime'}
                    minimumDate={new Date()}
                    display={'default'}
                    themeVariant={'dark'}
                    onChange={onChangeDate}
                  />
                </View>
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              marginTop: 20,
              alignItems: 'center',
            }}>
            <View style={{width: 150, marginBottom: 10}}>
              <Button
                title="Save"
                onPress={() =>
                  title == '' ? Alert.alert('Title Is Empty!') : addData()
                }
              />
            </View>
            <View style={{width: 150}}>
              <Button color="#36393F" title="Cancel" onPress={toggleModal} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingBtn: {
    width: 60,
    height: 60,
    paddingTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#01c853',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  textInput: {
    padding: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  timepicker: {
    justifyContent: 'center',
  },
  timepicker_ios: {
    width: 200,
    justifyContent: 'center',
  },
});

export default ModalComponent;
