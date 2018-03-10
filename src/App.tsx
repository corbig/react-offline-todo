import * as React from 'react';
import './App.css';
import { createStore } from 'redux';
import { todoReducer } from './reducers/TodoReducer';
import { Provider } from 'react-redux';
import { TodoView } from './views/TodoView/TodoView';
import { AppBar, Typography, Toolbar } from 'material-ui';

class App extends React.Component {
  render() {

    let store = createStore(todoReducer);

    return (
      <Provider store={store}>
        <div className="app">

          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="title" color="inherit">
                React-Todo
              </Typography>
            </Toolbar>
          </AppBar>

          <TodoView />
        </div>
      </Provider>
    );
  }
}

export default App;
