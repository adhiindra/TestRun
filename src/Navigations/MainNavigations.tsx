import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {StatusBar, Text} from 'react-native';
import TodoList from '../Screen/TodoList/TodoList';
import {observer} from 'mobx-react-lite';
import {useStoreTodo} from '../Model/TodoData';
import LoginUser from '../Screen/LoginUser/LoginUser';
import RegisterUser from '../Screen/RegisterUser/RegisterUser';

const Stack = createNativeStackNavigator();

const MainNavigations = observer(() => {
  const {login} = useStoreTodo();
  const {token} = login;

  StatusBar.setBarStyle('light-content', true);

  const MyTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#40444B',
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        {!token ? (
          <>
            <Stack.Screen name="LoginUser" component={LoginUser} />
            <Stack.Screen name="RegisterUser" component={RegisterUser} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="TodoList"
              component={TodoList}
              options={{
                headerBackVisible: false,
                gestureEnabled: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default MainNavigations;
