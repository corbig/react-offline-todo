import * as React from 'react';
import { connect } from 'react-redux';
import { getAllTodos, changeStatus, removeTodo } from '../../actions/TodoActions';
import { TodoImmutable } from '../../entities/Todo';
import { List } from 'immutable';
import {
    List as ListComponent, ListItem, Checkbox, ListItemText,
    ListItemSecondaryAction, IconButton, Card
} from 'material-ui';
import { CodeStatus } from '../../constants/constants';
import DeleteIcon from 'material-ui-icons/Delete';
import './TodoList.css';

interface TodoListState {
    todoList: List<TodoImmutable>;
}

interface TodoListProps {
    getAllTodos: () => Promise<void>;
    changeStatus: (todo: TodoImmutable) => Promise<void>;
    removeTodo: (todo: TodoImmutable) => Promise<void>;
    todoList: List<TodoImmutable>;
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        getAllTodos: () => dispatch(getAllTodos()),
        changeStatus: (todo: TodoImmutable) => dispatch(changeStatus(todo)),
        removeTodo: (todo: TodoImmutable) => dispatch(removeTodo(todo))
    };
};

const mapStateToProps = (store: List<TodoImmutable>) => {
    return {
        todoList: store
    };
};

export class TodoList extends React.Component<TodoListProps, TodoListState> {

    componentWillMount() {
        this.props.getAllTodos();
    }

    public render() {
        if (this.props.todoList.size === 0) {
            return (<div />);
        }
        return (
            <Card className="todo-list">
                <ListComponent>
                    {this.props.todoList.map((todo: TodoImmutable) => (
                        <ListItem
                            key={todo.get('_id')}
                            dense={true}
                            button={true}
                            onClick={() => this.props.changeStatus(todo)}
                        >
                            <Checkbox
                                checked={todo.get('status') === CodeStatus.DONE}
                                tabIndex={-1}
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

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
