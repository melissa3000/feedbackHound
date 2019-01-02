import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';
import reducers from './reducers';

// create a new instance of the redux store
const store = createStore(reducers, {}, applyMiddleware());

// connect redux store to react side of application by using the provider tag.
// Set <App /> up as a child to the provider tag. Provider is a react component that knows 
// how to read changes from the redux store.
ReactDOM.render(
	<Provider store={store}><App /></Provider>,
	document.querySelector('#root')
);