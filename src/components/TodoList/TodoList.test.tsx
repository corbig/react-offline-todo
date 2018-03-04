import * as React from 'react';
import { shallow } from 'enzyme';
import { TodoList } from './TodoList';
import { expect } from 'chai';
import { IconButton, ListItem, Checkbox, ListItemText } from 'material-ui';
import sinon from 'sinon';
import { TodoImmutable, Todo } from '../../entities/Todo';
import { List, fromJS } from 'immutable';
import { CodeStatus } from '../../constants/constants';

describe('<TodoList />', () => {

    const changeStatus = (todo: TodoImmutable) => {
        return;
    };
    const removeTodo = (todo: TodoImmutable) => {
        return;
    };

    it('renders the <TodoList /> component', () => {

        const todoList: List<TodoImmutable> = fromJS([]);

        const wrapper = shallow(<TodoList todoList={todoList} changeStatus={changeStatus} removeTodo={removeTodo} />);

        expect(wrapper.find(ListItem).length).to.equal(0);

    });

    it('renders the <TodoList /> component with an unfinished todo', () => {

        const todo: Todo = {
            id: 'todo_1',
            content: 'my todo',
            status: CodeStatus.TODO
        };

        let todoList: List<TodoImmutable> = fromJS([todo]);

        const wrapper = shallow(<TodoList todoList={todoList} changeStatus={changeStatus} removeTodo={removeTodo} />);

        expect(wrapper.find(ListItem).length).to.equal(1);

        const todoElement = wrapper.find(ListItem);

        expect(todoElement.find(Checkbox).props().checked).to.equal(false);
        expect(todoElement.find(ListItemText).props().primary).to.equal('my todo');
        expect(todoElement.find(ListItemText).props().className).to.equal('');

    });

    it('renders the <TodoList /> component with an finished todo', () => {

        const todo: Todo = {
            id: 'todo_1',
            content: 'my todo',
            status: CodeStatus.DONE
        };

        let todoList: List<TodoImmutable> = fromJS([todo]);

        const wrapper = shallow(<TodoList todoList={todoList} changeStatus={changeStatus} removeTodo={removeTodo} />);

        expect(wrapper.find(ListItem).length).to.equal(1);

        const todoElement = wrapper.find(ListItem);

        expect(todoElement.find(Checkbox).props().checked).to.equal(true);
        expect(todoElement.find(ListItemText).props().primary).to.equal('my todo');
        expect(todoElement.find(ListItemText).props().className).to.equal('todo-done');

    });

    it('renders the <TodoList /> component and change todo status', () => {

        const changeStatusSpy = sinon.spy(changeStatus);

        const todo: Todo = {
            id: 'todo_1',
            content: 'my todo',
            status: CodeStatus.DONE
        };

        let todoList: List<TodoImmutable> = fromJS([todo]);

        const wrapper = shallow(<TodoList todoList={todoList} changeStatus={changeStatusSpy} removeTodo={removeTodo} />);

        expect(wrapper.find(ListItem).length).to.equal(1);

        const todoElement = wrapper.find(ListItem);

        todoElement.simulate('click');

        expect(changeStatusSpy.calledOnce).to.equal(true);

    });

    it('renders the <TodoList /> component and remove todo', () => {

        const removeTodoSpy = sinon.spy(removeTodo);

        const todo: Todo = {
            id: 'todo_1',
            content: 'my todo',
            status: CodeStatus.DONE
        };

        let todoList: List<TodoImmutable> = fromJS([todo]);

        const wrapper = shallow(<TodoList todoList={todoList} changeStatus={changeStatus} removeTodo={removeTodoSpy} />);

        expect(wrapper.find(ListItem).length).to.equal(1);

        const removeButtonElement = wrapper.find(ListItem).find(IconButton);

        removeButtonElement.simulate('click');

        expect(removeTodoSpy.calledOnce).to.equal(true);

    });

});