import { action, createStore, persist, computed } from "easy-peasy";
import { TodosModel } from "./models";

export interface StoreModel {
    todos: TodosModel
}
const storeModel: StoreModel = {
    todos: {
        todos: [],
        setToDo: action((state, payload) => {
            state.todos.push(payload);
        }),
        lengthTodo: computed((state) => state.todos.length),
        deleteTodo: action((state, payload) => {
            const dataFiltered = state.todos.filter((data) => data !== payload)
            state.todos = dataFiltered
        })
    }

}

const store = createStore(persist(storeModel));

export default store;