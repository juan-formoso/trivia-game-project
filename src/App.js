import React from 'react';
import Switcher from './components/Switcher';
import logo from './trivia.png';
import './App.css';

export default function App() {
  return (
    <>
      <img src={ logo } className="App-logo" alt="logo" />
      <Switcher />
    </>
  );
}
