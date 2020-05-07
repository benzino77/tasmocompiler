import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { IntlProvider } from 'react-intl';
import { allMessages } from './locales/languages';

let currentLocale = navigator.language.split(/[-_]/)[0];
console.log('Detected browser language: ' + currentLocale);
// Set default to english if not defined on supported languages
if (!allMessages[currentLocale]){
    console.log('Browser language (' + currentLocale + ') not supported changing to default (en)');
    currentLocale = 'en';
};

ReactDOM.render(
    <IntlProvider locale={currentLocale} messages={allMessages[currentLocale]}>
        <App />
    </IntlProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
