import {Instance, onSnapshot, types} from 'mobx-state-tree';
import {createContext, useContext} from 'react';
import { initialLogin, Login } from './login';
import {remove, load, save} from '../utils/storage';

const Timer = types
  .model({
    timeStart: types.number,
    timerOn: types.boolean,
    startDate: types.number,
    isFirstStart: types.boolean,
    displayTime: types.number,
    title: types.string,
    workingTime: types.number,
    restingTime: types.number,
    customTime: types.boolean,
    isPause: types.boolean,
    pauseTimer: types.number,
    progValue: types.number,
  })
  .actions(self => ({
    setTimeStart: (secs: number) => {
      self.timeStart = secs;
    },
    setTimerOn: (x: boolean) => {
      self.timerOn = x;
    },
    setStartDate: (x: number) => {
      self.startDate = x;
    },
    setIsFirstStart: (x: boolean) => {
      self.isFirstStart = x;
    },
    setDisplayTime: (x: number) => {
      self.displayTime = x;
    },
    setTitle: (x: string) => {
      self.title = x;
    },
    setWorkingTime: (x: number) => {
      self.workingTime = x;
    },
    setRestingTime: (x: number) => {
      self.restingTime = x;
    },
    setCustomTime: (x: boolean) => {
      self.customTime = x;
    },
    setIsPause: (x: boolean) => {
      self.isPause = x;
    },
    setPauseTimer: (x: number) => {
      self.pauseTimer = x;
    },
    setProgValue: (x: number) => {
      self.progValue = x;
    }
  }));

const Todo = types.model({
  id: types.number,
  title: types.string,
  date: types.Date,
  status: types.string,
  overdue: types.number,
});

const TodoData = types
  .model({
    todos: types.maybeNull(types.array(Todo)),
    time: Timer,
    login: Login
  })
  .actions(self => ({
    addTodo: (title: string, date: Date, status: string) => {
      let tempTodos: any = self.todos || [];
      tempTodos.push({
        id: Math.random(),
        title: title,
        date: date,
        status: status,
        overdue: 0,
      });
      self.todos = tempTodos;
    },
    deleteTodo: (id: number) => {
      let tempTodos: any = self.todos || [];
      tempTodos = tempTodos.filter(item => item.id !== id);
      self.todos = tempTodos;
    },
    updateStatusTodo: (id: number, newStatus: string) => {
      let tempTodos: any = self.todos || [];
      const index = tempTodos
        .map(function (x) {
          return x.id;
        })
        .indexOf(id);
      self.todos[index].status = newStatus;
    },
    clearStorage: async () => {
      await remove('TodoStorage');
    },
    checkStatus: (id: number) => {
      let tempTodos: any = self.todos || [];
      const index = tempTodos
        .map(function (x) {
          return x.id;
        })
        .indexOf(id);
      return self.todos[index].status;
    },
    overdueStatusUpdate: (id: number, status: number) => {
      let tempTodos: any = self.todos || [];
      const index = tempTodos
        .map(function (x) {
          return x.id;
        })
        .indexOf(id);
      self.todos[index].overdue = status;
    },
    overdueStatus: (id: number) => {
      let tempTodos: any = self.todos || [];
      const index = tempTodos
        .map(function (x) {
          return x.id;
        })
        .indexOf(id);
      return self.todos[index].overdue;
    },
  }));

export interface TodoType extends Instance<typeof Todo> {}

export interface TodoDataType extends Instance<typeof TodoData> {}

const TodoDataContext = createContext<TodoDataType>({} as TodoDataType);

export const TodoDataProvider = TodoDataContext.Provider;

export const useStoreTodo = () => useContext(TodoDataContext);

export async function setupTodoStore() {
  let useStoreTodo: TodoDataType;
  let data: any;

  try {
    data = (await load('TodoStorage')) || {};
    useStoreTodo = TodoData.create(data);
  } catch (e) {
    useStoreTodo = TodoData.create({
      todos: null,
      login: initialLogin,
      time: {
        timeStart: 10,
        timerOn: false,
        startDate: 0,
        isFirstStart: true,
        displayTime: 1500,
        title: 'LETS GO WORK!',
        workingTime: 1500,
        restingTime: 300,
        customTime: false,
        isPause: false,
        pauseTimer: 0,
        progValue: 1500,
      },
    });
  }

  onSnapshot(useStoreTodo, snapshot => {
    save('TodoStorage', snapshot);
    console.log(snapshot);
  });

  return useStoreTodo;
}
