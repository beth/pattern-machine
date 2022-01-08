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
  const onSquareUpdate = (clickedRowIdx, clickedColIdx, newValue) => {
    const newGrid = grid.map((row, rowIdx) => {
      return row.map((value, colIdx) => {
        if (clickedColIdx === colIdx && clickedRowIdx === rowIdx) {
          return newValue;
        } else {
          return value;
        }
      })
    });
    setGrid(newGrid);
  };
  return (
    <div className="grid">
      { grid.map((row, rowIdx) => <Row row={row} rowIdx={rowIdx} onSquareUpdate={onSquareUpdate} key={rowIdx}/>)}
    </div>
  );
}

function Row({row, rowIdx, onSquareUpdate}) {
  return <div className="row">
    {row.map((square, colIdx) => <Square color={square} rowIdx={rowIdx} colIdx={colIdx} onSquareUpdate={onSquareUpdate} key={colIdx}/>)}
  </div>
}

function Square({color, rowIdx, colIdx, onSquareUpdate}) {
  let classNameColor = '';
  if (color === GREEN) {
    classNameColor = 'green';
  } else if (color === ORANGE) {
    classNameColor = 'orange';
  } else if (color === PURPLE) {
    classNameColor = 'purple';
  }
  const onClick = () => {
    let newColor = (color + 1) % 3;
    onSquareUpdate(rowIdx, colIdx, newColor);
  }
  return (<div className={`square ${classNameColor}`} onClick={onClick}></div>)
}

export default App;
