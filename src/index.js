import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import Root from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
  <MuiThemeProvider>
    <Root />
  </MuiThemeProvider>
);	

ReactDOM.render(
	<Router>
		<App />
	</Router>, 
	document.getElementById('root'));
registerServiceWorker();
