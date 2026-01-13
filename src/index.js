import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import App from './App';
import reducers from './redusers';

const store = createStore(reducers);
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
