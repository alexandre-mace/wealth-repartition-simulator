import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './helpers.css';
import {App} from './App';
import * as serviceWorker from './serviceWorker';
import {createMuiTheme, MuiThemeProvider as ThemeProvider, responsiveFontSizes} from "@material-ui/core";

let theme = createMuiTheme({
    palette: {
        primary: {
            main: '#38d39f'
        }
    },
});
theme = responsiveFontSizes(theme);
ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
