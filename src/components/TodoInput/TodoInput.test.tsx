import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { TodoInput } from './TodoInput';
import { expect } from 'chai';
import { Input, IconButton } from 'material-ui';
import * as sinon from 'sinon';

describe('<TodoInput />', () => {

    const addTodo = () => {
        return;
    };

    it('should render a <TodoInput /> component', () => {

        const wrapper = shallow(<TodoInput addTodo={addTodo} />);

        expect(wrapper.find(Input).props().value).to.be.equal('');

    });

    it('should render a <TodoInput /> component and write a todo in input', () => {

        const wrapper = shallow(<TodoInput addTodo={addTodo} />);

        const event = {
            currentTarget: {
                value: 'my todo'
            }
        };

        wrapper.find(Input).simulate('change', event);

        expect(wrapper.find(Input).props().value).to.be.equal('my todo');

    });

    it('should render a <TodoInput /> and not call addTodo on click event if content is empty', () => {

        const addTodoSpy = sinon.spy(addTodo);
        const wrapper = mount(<TodoInput addTodo={addTodoSpy} />);

        wrapper.find(IconButton).simulate('click');

        sinon.assert.notCalled(addTodoSpy);
    });

    it('should render a <TodoInput /> and call addTodo on click event', () => {

        const addTodoSpy = sinon.spy(addTodo);

        const wrapper = mount(<TodoInput addTodo={addTodoSpy} />);

        wrapper.setState({ todoContent: 'new todo' });

        wrapper.find(IconButton).simulate('click');

        sinon.assert.calledOnce(addTodoSpy);
        sinon.assert.calledWithExactly(addTodoSpy, 'new todo');
        expect(wrapper.find(Input).props().value).to.equal('');
    });

});