import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Navbar from './components/AppBar/appBar';
import Footer from './components/Footer/footer';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(
    <React.StrictMode>
        <Navbar />
        <App />
        <Footer />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorkerRegistration.register();

