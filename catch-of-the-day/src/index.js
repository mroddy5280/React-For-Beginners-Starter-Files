import React from 'react';
// Could have done and referenced Component ion the class instead
// import { component } from 'react';
import { render } from 'react-dom';
import Router from './components/Router';
import './css/style.css';
/*
  Need to have a mounting point for the actual element to mount to the page.
  We can then use the StorePicker tag to call the StorePicker component
*/
render(<Router />, document.querySelector('#main'));
