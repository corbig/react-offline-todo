import { List, fromJS } from 'immutable';
import { TodoImmutable } from '../entities/Todo';
import { Action } from '../constants/constants';

interface TodoAction {
    type: string;
    todo: TodoImmutable;
    todoList: List<TodoImmutable>;
}

export const todoReducer = (state: List<TodoImmutable> = fromJS([]), action: TodoAction) => {
    switch (action.type) {
        case Action.GET_ALL_TODOS:
            return action.todoList;
        case Action.ADD_TODO:
            return state.push(action.todo);
        case Action.UPDATE_TODO:
            return state.set(
                state.findIndex((todo: TodoImmutable) => todo.get('_id') === action.todo.get('_id')),
                action.todo
            );
        case Action.REMOVE_TODO:
            return state.remove(
                state.findIndex((todo: TodoImmutable) => todo.get('_id') === action.todo.get('_id'))
            );
        default:
            return state;
    }
};