import * as React from 'react';
import { IconButton, FormControl, InputLabel } from 'material-ui';
import Input, { InputAdornment } from 'material-ui/Input';
import AddIcon from 'material-ui-icons/Add';
import './TodoInput.css';
import { connect } from 'react-redux';
import { addTodo } from '../../actions/TodoActions';

/**
 * Interfaces of TodoInput state/props 
 */
interface TodoInputState {
    todoContent: string;
}

interface TodoInputProps {
    addTodo: (todoContent: string) => void;
}

/**
 * Function to call redux actions
 */
const mapDispatchToProps = (dispatch: Function) => {
    return {
        addTodo: (todoContent: string) => dispatch(addTodo(todoContent))
    };
};

/**
 * TodoInput Component
 */
export class TodoInput extends React.Component<TodoInputProps, TodoInputState> {

    constructor(props: TodoInputProps) {
        super(props);

        this.state = {
            todoContent: '' // input content
        };
    }

    /**
     * Function to refresh input content on each keystroke
     */
    handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({
            todoContent: event.currentTarget.value,
        });
    }

    /**
     * Function to call the addTodo Redux action
     */
    addTodo = () => {

        if (this.state.todoContent !== '') {
            this.props.addTodo(this.state.todoContent);
            this.setState({ todoContent: '' });
        }
    }

    public render() {

        return (
            <div className="input-todos">
                <FormControl fullWidth={true}>
                    <InputLabel>New Task</InputLabel>
                    <Input
                        value={this.state.todoContent}
                        onChange={this.handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={this.addTodo} color="primary">
                                    <AddIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </div>
        );
    }
}
/**
 * We connect the TodoList component to Redux
 * Here, we don't need a mapStateToProps
 */
export default connect(null, mapDispatchToProps)(TodoInput);
