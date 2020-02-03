import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './helpers.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createMuiTheme, MuiThemeProvider as ThemeProvider, responsiveFontSizes} from "@material-ui/core";
import rootReducer from './reducers'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

let theme = createMuiTheme({
    palette: {
        primary: {
            main: '#38d39f'
        }
    },
});
theme = responsiveFontSizes(theme);

const store = createStore(rootReducer)

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </ThemeProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
