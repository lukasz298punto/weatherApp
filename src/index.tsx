import CssBaseline from '@material-ui/core/CssBaseline';
import Root from 'components/Root';
import { store } from 'context/store';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <CssBaseline />
            <Root />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
