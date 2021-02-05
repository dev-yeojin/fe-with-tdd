var App = App || {};

App.TodoList = () => {
  let todoList = [
      {
          idx: 0,
          todo: 'Spring 공부하기',
          done : false
      }
  ];
  let idx = 1;

  return {
    getTodoList() {
      return todo;
    },
    addTodo(todo) {
      let obj = {
        idx,
        todo,
        done: false,
      };
      todoList.push(obj);
    },
    doneTodo(idx) {
      todoList.map((item) =>
        item.idx === idx ? { ...item, done: !item.done } : item
      );
    },
    deleteTodo(idx) {
      todoList.filters((item) => {
        item.idx !== idx;
      });
    },
  };
};

App.TodoListView = () => {
    return 
}
App.TodoList.message = {
  noTodo: "Add Todo!",
};
