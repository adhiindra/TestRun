import React, {useLayoutEffect, useState} from 'react';
import MainNavigations from './src/Navigations/MainNavigations';
import {
  setupTodoStore,
  TodoDataProvider,
  TodoDataType,
} from './src/Model/TodoData';
import {TestVar, secondTest} from '@env';
import codePush from 'react-native-code-push';
import { setNotificationsPermission } from './src/utils/notification';

let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_RESUME};

const App = () => {

  setNotificationsPermission();
  
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

  console.log(TestVar, secondTest);
  return (
    <TodoDataProvider value={todoStore}>
      <MainNavigations/>
    </TodoDataProvider>
  );
};

export default codePush(codePushOptions)(App);
