import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';
import { IntlProvider } from 'react-intl';
import { allMessages } from './locales/languages';

console.log('Detecting current language of browser...');
const currentLocale = navigator.language.split(/[-_]/)[0];
console.log('Browser language is: ' + currentLocale);
const defaultLocale = 'en';

ReactDOM.render(
    <IntlProvider locale={currentLocale} messages={allMessages[currentLocale]} defaultLocale={defaultLocale}>
        <App />
    </IntlProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
