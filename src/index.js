import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { IntlProvider } from 'react-intl';
import { allMessages } from './locales/languages';
import languages from './components/AppStepper/VersionStep/Variables/Languages';
import availableFeatures, { featureTypes } from './components/AppStepper/FeaturesStep/AvailableFeatures'

let currentLocale = navigator.language.split(/[-_]/)[0];
console.log('Detected browser language: ' + currentLocale);
// Set default to english if not defined on supported languages
if (!allMessages[currentLocale]){
    console.log('Browser language (' + currentLocale + ') not supported changing to default (en)');
    currentLocale = 'en';
};

languages.sort((a , b) => {
    return allMessages[currentLocale][a.name]
        .localeCompare(allMessages[currentLocale][b.name],
        currentLocale, { sensitivity: 'base' });
});

availableFeatures.sort((a , b) => {
    if (!a.description || a.description === ''){
        return -1;
    } else if (!b.description || b.description === ''){
        return 1;
    } else {
        return allMessages[currentLocale][a.description]
        .localeCompare(allMessages[currentLocale][b.description],
        currentLocale, { sensitivity: 'base' });
    }
});

featureTypes.sort((a , b) => {
    if (a === 'generic'){
        return -1;
    } else if (b === 'generic'){
        return 1;
    } else {
        return allMessages[currentLocale]['stepFeatures' + a.charAt(0).toUpperCase() + a.slice(1) + 'TypeDesc']
            .localeCompare(allMessages[currentLocale]['stepFeatures' + b.charAt(0).toUpperCase() + b.slice(1) + 'TypeDesc'],
            currentLocale, { sensitivity: 'base' });
    }
});

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
