import './sass/style.sass';
import React from "react";
import ReactDOM from 'react-dom';
import {FormComponent} from './components/FormComponent.jsx'

const App = () => {
    return (
        <>
        <FormComponent />
        </>
        )
}

const root = ReactDOM.createRoot(document.getElementById('main'));
root.render(<App/>);