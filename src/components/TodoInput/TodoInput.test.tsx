import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { TodoInput } from './TodoInput';
import { expect } from 'chai';
import { Input, IconButton } from 'material-ui';
import sinon from 'sinon';

describe('<TodoInput />', () => {

    const addTodo = () => {
        return;
    };

    it('renders the <TodoInput /> component', () => {

        const wrapper = shallow(<TodoInput addTodo={addTodo} />);

        expect(wrapper.find(Input).props().value).to.be.equal('');

    });

    it('renders the <TodoInput /> component and write a todo in input', () => {

        const wrapper = shallow(<TodoInput addTodo={addTodo} />);

        const event = {
            currentTarget: {
                value: 'my todo'
            }
        };

        wrapper.find(Input).simulate('change', event);

        expect(wrapper.find(Input).props().value).to.be.equal('my todo');

    });

    it('renders the <TodoInput /> component and click on add button with empty content', () => {

        const addTodoSpy = sinon.spy(addTodo);

        const wrapper = mount(<TodoInput addTodo={addTodoSpy} />);

        wrapper.find(IconButton).simulate('click');

        expect(addTodoSpy.calledOnce).to.equal(false);
    });

    it('renders the <TodoInput /> component and click on add button with content', () => {

        const addTodoSpy = sinon.spy(addTodo);

        const wrapper = mount(<TodoInput addTodo={addTodoSpy} />);

        wrapper.setState({ todoContent: 'new todo' });

        wrapper.find(IconButton).simulate('click');

        expect(addTodoSpy.calledOnce).to.equal(true);
        expect(addTodoSpy.getCall(0).args[0]).to.equal('new todo');
        expect(wrapper.find(Input).props().value).to.equal('');

    });

});