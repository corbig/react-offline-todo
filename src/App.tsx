import * as React from 'react';
import './App.css';
import { createStore, applyMiddleware } from 'redux';
import { todoReducer } from './reducers/TodoReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { TodoView } from './views/TodoView/TodoView';
import { AppBar, Typography, Toolbar } from 'material-ui';

class App extends React.Component {
  render() {

    let store = createStore(todoReducer, applyMiddleware(thunk));

    return (
      <Provider store={store}>
        <div className="app">
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography type="title" color="inherit">
                React-Offline-Todo
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
