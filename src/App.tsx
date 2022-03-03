import React from 'react';
import './App.css';
import { Game } from './features/game';

function App() {
  return (
    <div className="App" data-testid="App">
      <Game />
    </div>
  );
}

export default App;
