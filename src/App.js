import './App.css';
import { useState } from 'react';

const GRID_SIZE = 9;
const COLORS = ['green', 'orange', 'purple'];

const createInitialState = (num) => {
  const state = [];
  for (let rowIdx = 0; rowIdx < num; rowIdx++) {
    state.push(Array(num).fill(0));
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
  const onClick = () => {
    let newColor = (color + 1) % COLORS.length;
    onSquareUpdate(rowIdx, colIdx, newColor);
  }
  return (<div className={`square ${COLORS[color]}`} onClick={onClick}></div>)
}

export default App;
