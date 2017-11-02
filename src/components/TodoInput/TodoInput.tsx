import * as React from 'react';
import { TextField, Button } from 'material-ui';
import AddIcon from 'material-ui-icons/Add';
import './TodoInput.css';
import { connect } from 'react-redux';
import { addTodo } from '../../actions/TodoActions';

interface TodoInputState {
    todoContent: string;
}

interface TodoInputProps {
    addTodo: (todoContent: string) => Promise<PouchDB.UpsertResponse>;
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        addTodo: (todoContent: string) => dispatch(addTodo(todoContent))
    };
};

export class TodoInput extends React.Component<TodoInputProps, TodoInputState> {

    constructor(props: TodoInputProps) {
        super(props);

        this.state = {
            todoContent: ''
        };
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            todoContent: event.currentTarget.value,
        });
    }

    addTodo = () => {

        if (this.state.todoContent !== '') {
            this.props.addTodo(this.state.todoContent);
            this.setState({ todoContent: '' });
        }
    }

    public render() {

        return (
            <div className="input-todos">
                <TextField
                    label="Nouvelle tâche"
                    className="input-field"
                    value={this.state.todoContent}
                    onChange={this.handleChange}
                    margin="normal"
                />

                <Button color="primary" raised={true} className="add-button" onClick={this.addTodo}>
                    <AddIcon />
                </Button>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(TodoInput);
