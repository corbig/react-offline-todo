import * as React from 'react';
import { shallow } from 'enzyme';
import { TodoList } from './TodoList';
import { expect as chaiExpect } from 'chai';
import { IconButton, ListItem, Checkbox, ListItemText } from 'material-ui';
import * as sinon from 'sinon';
import { TodoImmutable, Todo } from '../../entities/Todo';
import { List, fromJS } from 'immutable';
import { CodeStatus } from '../../constants/constants';
import * as renderer from 'react-test-renderer';

describe('<TodoList />', () => {

    const changeStatus = (todo: TodoImmutable) => {
        return;
    };
    const removeTodo = (todo: TodoImmutable) => {
        return;
    };

    it('should render a <TodoList /> component', () => {

        const todoList: List<TodoImmutable> = fromJS([]);

        const wrapper = shallow(<TodoList todoList={todoList} changeStatus={changeStatus} removeTodo={removeTodo} />);

        chaiExpect(wrapper.find(ListItem).length).to.equal(0);

    });

    it('should render a <TodoList /> component with an unfinished todo', () => {

        const todo: Todo = {
            id: 'todo_1',
            content: 'my todo',
            status: CodeStatus.TODO
        };

        let todoList: List<TodoImmutable> = fromJS([todo]);

        const wrapper = shallow(<TodoList todoList={todoList} changeStatus={changeStatus} removeTodo={removeTodo} />);

        chaiExpect(wrapper.find(ListItem).length).to.equal(1);

        const todoElement = wrapper.find(ListItem);

        chaiExpect(todoElement.find(Checkbox).props().checked).to.equal(false);
        chaiExpect(todoElement.find(ListItemText).props().primary).to.equal('my todo');
        chaiExpect(todoElement.find(ListItemText).props().className).to.equal('');

    });

    it('should render a <TodoList /> component with an unfinished todo (Jest snapshot ver.)', () => {
        const todo: Todo = {
            id: 'todo_1',
            content: 'my todo',
            status: CodeStatus.TODO
        };

        let todoList: List<TodoImmutable> = fromJS([todo]);

        const componentTree = renderer.create(<TodoList todoList={todoList} changeStatus={changeStatus} removeTodo={removeTodo} />).toJSON();
        // Jest's expect function
        expect(componentTree).toMatchSnapshot();
    });

    it('should render a <TodoList /> component with a finished todo', () => {

        const todo: Todo = {
            id: 'todo_1',
            content: 'my todo',
            status: CodeStatus.DONE
        };

        let todoList: List<TodoImmutable> = fromJS([todo]);

        const wrapper = shallow(<TodoList todoList={todoList} changeStatus={changeStatus} removeTodo={removeTodo} />);

        chaiExpect(wrapper.find(ListItem).length).to.equal(1);

        const todoElement = wrapper.find(ListItem);

        chaiExpect(todoElement.find(Checkbox).props().checked).to.equal(true);
        chaiExpect(todoElement.find(ListItemText).props().primary).to.equal('my todo');
        chaiExpect(todoElement.find(ListItemText).props().className).to.equal('todo-done');

    });

    it('should render a <TodoList /> component with a finished todo (Jest snapshot ver.)', () => {
        const todo: Todo = {
            id: 'todo_1',
            content: 'my todo',
            status: CodeStatus.DONE
        };

        let todoList: List<TodoImmutable> = fromJS([todo]);

        const componentTree = renderer.create(<TodoList todoList={todoList} changeStatus={changeStatus} removeTodo={removeTodo} />).toJSON();
        
        // Jest's expect function
        expect(componentTree).toMatchSnapshot();
    });

    it('should render a <TodoList /> component and change todo status', () => {

        const changeStatusSpy = sinon.spy(changeStatus);

        const todo: Todo = {
            id: 'todo_1',
            content: 'my todo',
            status: CodeStatus.DONE
        };

        let todoList: List<TodoImmutable> = fromJS([todo]);

        const wrapper = shallow(<TodoList todoList={todoList} changeStatus={changeStatusSpy} removeTodo={removeTodo} />);

        chaiExpect(wrapper.find(ListItem).length).to.equal(1);

        const todoElement = wrapper.find(ListItem);

        todoElement.simulate('click');

        sinon.assert.calledOnce(changeStatusSpy);

    });

    it('should render a <TodoList /> component and remove todo', () => {

        const removeTodoSpy = sinon.spy(removeTodo);

        const todo: Todo = {
            id: 'todo_1',
            content: 'my todo',
            status: CodeStatus.DONE
        };

        let todoList: List<TodoImmutable> = fromJS([todo]);

        const wrapper = shallow(<TodoList todoList={todoList} changeStatus={changeStatus} removeTodo={removeTodoSpy} />);

        chaiExpect(wrapper.find(ListItem).length).to.equal(1);

        const removeButtonElement = wrapper.find(ListItem).find(IconButton);

        removeButtonElement.simulate('click');

        sinon.assert.calledOnce(removeTodoSpy);

    });

});