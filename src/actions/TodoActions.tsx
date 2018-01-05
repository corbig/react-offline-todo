import { TodoImmutable, Todo } from '../entities/Todo';
import { fromJS } from 'immutable';
import { CodeStatus, Action } from '../constants/constants';

/**
 * Function to add a new todo
 * 
 * @param todoContent : content of the todo
 */
export const addTodo = (todoContent: string) => {
    const newTodo: Todo = {
        id: new Date().getTime().toString(), 
        content: todoContent,
        status: CodeStatus.TODO
    };

    return {
        type: Action.ADD_TODO,
        todo: fromJS(newTodo)
    };

};

/**
 * Function to change a todo status
 * @param todo 
 */
export const changeStatus = (todo: TodoImmutable) => {

    todo = todo.set('status', todo.get('status') === CodeStatus.DONE ? CodeStatus.TODO : CodeStatus.DONE);
    
    return {
        type: Action.UPDATE_TODO,
        todo
    };
};

/**
 * Function to remove a todo
 * @param todo 
 */
export const removeTodo = (todo: TodoImmutable) => {

    return {
        type: Action.REMOVE_TODO,
        todo
    };
};