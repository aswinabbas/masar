import { Action, Computed } from 'easy-peasy';

export interface TODO {
    todos: string[]
}
export interface TodosModel {
    todos: string[];
    setToDo: Action<TodosModel, string>;
    lengthTodo: Computed<TodosModel, number>;
    deleteTodo?: Action<TodosModel, string>;
}