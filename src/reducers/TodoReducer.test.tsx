import { expect } from 'chai';
import { TodoImmutable } from '../entities/Todo';
import { List, fromJS } from 'immutable';
import { CodeStatus, Action } from '../constants/constants';
import { todoReducer } from './TodoReducer';

describe('TodoReducer', () => {
    const todo: TodoImmutable = fromJS({
        id: 'todo_0',
        content: 'content',
        status: CodeStatus.TODO
    });

    it('should do noting', () => {

        const state: List<TodoImmutable> = fromJS([]);
        const action = {
            type: 'NOTHING',
            todo
        };

        const result = todoReducer(state, action);

        expect(result).to.deep.equal(fromJS([]));

    });

    it('should add a todo', () => {

        const state: List<TodoImmutable> = fromJS([]);
        const action = {
            type: Action.ADD_TODO,
            todo
        };

        const result = todoReducer(state, action);

        expect(result.size).to.equal(1);
        expect(result.get(0)).to.deep.equal(todo);
    });

    it('should update a todo', () => {

        const state: List<TodoImmutable> = fromJS([todo]);

        const newTodo = todo.set('status', CodeStatus.DONE);

        const action = {
            type: Action.UPDATE_TODO,
            todo: newTodo
        };

        const result = todoReducer(state, action);

        expect(result.size).to.equal(1);
        expect(result.get(0)).to.deep.equal(newTodo);

    });

    it('should remove a todo', () => {

        const state: List<TodoImmutable> = fromJS([todo]);

        const action = {
            type: Action.REMOVE_TODO,
            todo
        };

        const result = todoReducer(state, action);

        expect(result.size).to.equal(0);
    });
});