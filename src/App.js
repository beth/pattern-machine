import './App.css';
import { useState } from 'react';

const GREEN = 0;
const ORANGE = 1;
const PURPLE = 2;

const GRID_SIZE = 9;

const createInitialState = (num) => {
  const state = [];
  for (let rowIdx = 0; rowIdx < num; rowIdx++) {
    state.push(Array(num).fill(GREEN));
  }
  return state;
};

function App() {
  const [grid, setGrid] = useState(createInitialState(GRID_SIZE));
  return (
    <div className="grid">
      { grid.map(row => <Row row={row} />)}
    </div>
  );
}

function Row({row}) {
  return <div class="row">
    {row.map(square => <Square />)}
  </div>
}

function Square() {
  return (<div className="square"></div>)
}

export default App;
