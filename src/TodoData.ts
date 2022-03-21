import {Instance, onSnapshot, types} from 'mobx-state-tree';
import {createContext, useContext} from 'react';
import {remove, load, save} from './utils/storage';

const Timer = types.model({
  timeStart: types.number,
  timerOn : types.boolean,
  startDate: types.number,
}).actions(self => ({
  setTimeStart: (secs : number) => {
    self.timeStart = secs
  },
  setTimerOn :  (x : boolean) => {
    self.timerOn = x
  },
  setStartDate :  (x : number) => {
    self.startDate = x
  }
}))

const Todo = types.model({
  id: types.number,
  title: types.string,
  date: types.Date,
  status: types.string,
  
});



const TodoData = types
  .model({
    todos: types.maybeNull(types.array(Todo)),
    time: Timer
  })
  .actions(self => ({
    addTodo: (title: string, date: Date, status: string) => {
      let tempTodos: any = self.todos || [];
      tempTodos.push({
        id: Math.random(),
        title: title,
        date: date,
        status: status,
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
      time : {
        timeStart: 10,
        timerOn : false,
        startDate: 0
      }
    });
  }
  onSnapshot(useStoreTodo, snapshot => {
    save('TodoStorage', snapshot);
    console.log(snapshot);
  });

  return useStoreTodo;
}
