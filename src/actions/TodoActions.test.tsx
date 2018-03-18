import { expect } from 'chai';
import { TodoImmutable } from '../entities/Todo';
import { fromJS } from 'immutable';
import { CodeStatus, Action } from '../constants/constants';
import { addTodo, changeStatus, removeTodo } from './TodoActions';

describe('TodoActions', () => {

    const todo: TodoImmutable = fromJS({
        id: 'todo_0',
        content: 'content',
        status: CodeStatus.TODO
    });

    it('should send an action to add todo', () => {

        const action = addTodo('myContent');

        expect(action.type).to.equal(Action.ADD_TODO);
        expect(action.todo.get('content')).to.equal('myContent');
        expect(action.todo.get('status')).to.equal(CodeStatus.TODO);
    });

    it('should send an action to modify the status of a todo', () => {

        const action = changeStatus(todo);

        const changedTodo = todo.set('status', CodeStatus.DONE);

        expect(action.type).to.equal(Action.UPDATE_TODO);
        expect(action.todo).to.deep.equal(changedTodo);
    });

    it('should send an action to remove a todo', () => {

        const action = removeTodo(todo);

        expect(action.type).to.equal(Action.REMOVE_TODO);
        expect(action.todo).to.deep.equal(todo);
    });
});    