import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Setting from '../Setting/Setting';
import ModalComponent from './component/ModalComponent';
import {observer} from 'mobx-react-lite';
import { useStoreTodo } from '../../Model/TodoData';
import Timer from '../Timer/Timer';
import dayjs from 'dayjs';

const Tab = createMaterialBottomTabNavigator();

const Home = observer(() => {
  const {
    todos,
    login,
    deleteTodo,
    updateStatusTodo,
    checkStatus,
    overdueStatus,
    overdueStatusUpdate,
  } = useStoreTodo();
  const [extraDataDate, setExtraDataDate] = useState(new Date());
  const {email} = login;

  const updateList = (id: number, status: string) => {
    updateStatusTodo(id, status);
    setExtraDataDate(new Date());
  };

  const deleteList = (id: number) => {
    deleteTodo(id);
    setExtraDataDate(new Date());
  };

  const checkOverdue = (id: number, date: Date) => {
    if (overdueStatus(id) == 0) {
      if (date < new Date(Date.now())) {
        updateStatusTodo(id, 'OVERDUE');
        overdueStatusUpdate(id, 1);
        return checkStatus(id);
      } else {
        return checkStatus(id);
      }
    } else {
      return checkStatus(id);
    }
  };

  return (
    <View>
      <View style={styles.canvas}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 23,
            paddingHorizontal: 24,
            paddingBottom: 20,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 30,
            }}>
            Hi, {email}
          </Text>
          <TouchableOpacity onPress={() => setExtraDataDate(new Date(Date.now()))}>
            <Icon name="refresh" size={30} color={'white'} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={todos}
          extraData={!todos || todos.length === null ? 1 : todos.length}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={{marginBottom: 20, marginLeft: 20, marginRight: 20}}>
              <View style={styles.container}>
                <View style={styles.cardTop}>
                  <View
                    style={{
                      backgroundColor:
                        checkOverdue(item.id, new Date(item.date)) === 'OPEN'
                          ? '#C4C4C4'
                          : checkOverdue(item.id, new Date(item.date)) ===
                            'DONE'
                          ? '#39C36D'
                          : '#C33939',
                      paddingHorizontal: 18,
                      paddingVertical: 8,
                      borderRadius: 30,
                    }}>
                    <Text
                      style={
                        checkOverdue(item.id, new Date(item.date)) === 'OPEN'
                          ? styles.cardTitle_black
                          : styles.cardTitle_white
                      }>
                      {checkOverdue(item.id, new Date(item.date))}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#36393F',
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      borderRadius: 10,
                    }}
                    onPress={() => deleteList(item.id)}>
                    <Icon name="trash" size={20} color="white" />
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 10, marginHorizontal: 3}}>
                  <Text
                    style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
                    {item.title}
                  </Text>
                  <View
                    style={{
                      flex: 2,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={{marginTop: 10}}>
                      <Text style={styles.cardDescription}>Due Date:</Text>
                      <Text style={styles.cardDescription}>
                        {dayjs(item.date).format('DD-MM-YYYY, h:mm')}
                      </Text>
                    </View>
                    {checkOverdue(item.id, new Date(item.date)) != 'DONE' && (
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#5440D1',
                          paddingHorizontal: 30,
                          paddingVertical: 10,
                          borderRadius: 10,
                        }}
                        onPress={() => updateList(item.id, 'DONE')}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>
                          DONE
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>
      <ModalComponent />
    </View>
  );
});

const TodoList = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => <Icon name="home" color="white" size={24} />,
        }}
      />
      <Tab.Screen
        name="Timer"
        component={Timer}
        options={{
          tabBarLabel: 'Timer',
          tabBarIcon: () => <Icon name="clock-o" color="white" size={24} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: () => <Icon name="gear" color="white" size={24} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  canvas: {
    height: '100%',
    backgroundColor: '#36393F',
  },
  inModal: {
    padding: 20,
  },
  modal: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 160,
    left: 20,
    right: 0,
    bottom: 0,
    width: '90%',
    height: '50%',
  },
  btmMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 30,
    color: 'white',
  },
  floatingBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#01c853',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  container: {
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 30,
    justifyContent: 'center',
    backgroundColor: '#40444B',
    elevation: 5,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 5,
    shadowOpacity: 0.1,
  },
  cardTop: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle_white: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  cardTitle_black: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  cardDescription: {
    fontSize: 15,
    color: 'white',
  },
  textInput: {
    marginTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 5,
  },
  btn: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 50,
  },
});

export default TodoList;
