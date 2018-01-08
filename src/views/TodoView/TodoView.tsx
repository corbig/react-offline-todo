import * as React from 'react';
import TodoInput from '../../components/TodoInput/TodoInput';
import TodoList from '../../components/TodoList/TodoList';
import './TodoView.css';
 
export class TodoView extends React.Component {

    public render() {

        return (
            <div className="todo-view">
                <TodoList />
                <TodoInput />
            </div>
        );
    }
}
