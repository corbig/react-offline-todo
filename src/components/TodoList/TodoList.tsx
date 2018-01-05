import * as React from 'react';
import { connect } from 'react-redux';
import { changeStatus, removeTodo } from '../../actions/TodoActions';
import { TodoImmutable } from '../../entities/Todo';
import { List } from 'immutable';
import {
    List as ListComponent, ListItem, Checkbox, ListItemText,
    ListItemSecondaryAction, IconButton, Card
} from 'material-ui';
import { CodeStatus } from '../../constants/constants';
import DeleteIcon from 'material-ui-icons/Delete';
import './TodoList.css';

/**
 * Interfaces of TodoList state/props 
 */
interface TodoListState {
    
}

interface TodoListProps {
    changeStatus: (todo: TodoImmutable) => Promise<void>;
    removeTodo: (todo: TodoImmutable) => Promise<void>;
    todoList: List<TodoImmutable>;
}

/**
 * Function to call redux actions
 * @param dispatch redux function to notify the store
 */
const mapDispatchToProps = (dispatch: Function) => {
    return {
        changeStatus: (todo: TodoImmutable) => dispatch(changeStatus(todo)),
        removeTodo: (todo: TodoImmutable) => dispatch(removeTodo(todo))
    };
};

/**
 * Function to map redux store properties to TodoList properties
 * @param store 
 */
const mapStateToProps = (store: List<TodoImmutable>) => {
    return {
        todoList: store
    };
};

/**
 * TodoList Component
 */
export class TodoList extends React.Component<TodoListProps, TodoListState> {

    public render() {
        // if there is no todo we return an empty div
        if (this.props.todoList.size === 0) {
            return (<div />);
        }
        return (
            <Card className="todo-list">
                <ListComponent className="list-component">
                    {this.props.todoList.map((todo: TodoImmutable) => (
                        <ListItem
                            key={todo.get('id')}
                            dense={true}
                            button={true}
                            onClick={() => this.props.changeStatus(todo)}
                        >
                            <Checkbox
                                checked={todo.get('status') === CodeStatus.DONE}
                            />
                            <ListItemText
                                primary={todo.get('content')}
                                className={todo.get('status') === CodeStatus.DONE ? 'todo-done' : ''}
                            />
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => this.props.removeTodo(todo)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </ListComponent>
            </Card>
        );
    }
}

/**
 * We connect the TodoList component to Redux
 */
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
