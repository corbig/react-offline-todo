import { List, fromJS } from 'immutable';
import { TodoImmutable } from '../entities/Todo';
import { Action } from '../constants/constants';

interface TodoAction {
    type: string;
    todo: TodoImmutable;
}

/**
 * Function to refrsh redux store. This is here where every redux notification
 * can be caught.
 * 
 * @param state : current state of redux store
 * @param action : the notification sent to the function
 * @returns the new state of the store
 */
export const todoReducer = (state: List<TodoImmutable> = fromJS([]), action: TodoAction) => {
    switch (action.type) {
        case Action.ADD_TODO: // We add the new todo to the state
            return state.push(action.todo);
        case Action.UPDATE_TODO: // We find the todo to change and we replace it
            return state.set(
                state.findIndex((todo: TodoImmutable) => todo.get('id') === action.todo.get('id')),
                action.todo
            );
        case Action.REMOVE_TODO: // We find the todo to delete and we remove it
            return state.remove(
                state.findIndex((todo: TodoImmutable) => todo.get('id') === action.todo.get('id'))
            );
        default:
            return state;
    }
};