import React, {useLayoutEffect, useState} from 'react';
import {
  DarkTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TodoList from './src/Navigations/TodoList';
import Setting from './src/Navigations/Setting';
import Login from './src/Navigations/Login';
import {setupTodoStore, TodoDataProvider, TodoDataType} from './src/TodoData';
import {StatusBar} from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  const [todoStore, setTodoStore] = useState<TodoDataType | undefined>(
    undefined,
  );

  useLayoutEffect(() => {
    (async () => {
      setupTodoStore().then(x => setTodoStore(x));
    })();
  }, []);

  if (!todoStore) {
    return null;
  }

  StatusBar.setBarStyle('light-content', true);

  const MyTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#40444B',
    },
  };

  return (
    <TodoDataProvider value={todoStore}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="TodoList"
            component={TodoList}
            options={{
              headerBackVisible: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen name="Setting" component={Setting} />
        </Stack.Navigator>
      </NavigationContainer>
    </TodoDataProvider>
  );
};

export default App;
