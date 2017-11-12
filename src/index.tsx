import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerOfflinePlugin from './registerOfflinePlugin';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerOfflinePlugin();