import './App.css';
import { useState, useEffect } from 'react';
import { 
  createNewGrid,
  MIN_GRID,
  MAX_GRID,
  GRID_SIZE,
} from './grid-helpers';
import { shareGrid } from './share-helpers';
import { Title } from './components/title';
import { Settings } from './components/settings';
import { Message } from './components/message';
import { Row } from './components/row';

const MESSAGE_DELAY = 1000;

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [gridSize, setGridSize] = useState(GRID_SIZE);
  const [grid, setGrid] = useState(createNewGrid(GRID_SIZE));
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (window.screen.width < 550) {
      setGridSize(5);
      setGrid(createNewGrid(5));
    }
  }, []);

  const onCopy = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), MESSAGE_DELAY);
  }

  const incrementGridSize = (increment) => {
    const newGridSize = gridSize + increment;
    if (newGridSize> MAX_GRID || newGridSize< MIN_GRID) {
      return;
    }
    setGridSize(newGridSize);
    setGrid(createNewGrid(newGridSize, grid));
  };

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

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const resetGrid = () => {
    setGrid(createNewGrid(gridSize));
  };

  const onShareGrid = () => {
    shareGrid(grid, onCopy);
  }

  return (
    <div class="app">
      <div className="sidebar">
        <div class="header">
          <Title />
          <div class="buttons">
            <div class="left-section">
              <i onClick={toggleSettings} class={`fas fa-cog fa-2x ${showSettings ? 'selected' : ''}`}></i>
              <i onClick={onShareGrid} class="fas fa-share fa-2x"></i>
              <Message showMessage={showMessage}/>
            </div>
            <div class="right-section">
              <i onClick={resetGrid} class="fas fa-trash fa-2x"></i>
            </div>
          </div>
          <Settings 
            gridSize={gridSize}
            incrementGridSize={incrementGridSize}
            open={showSettings}
          />
        </div>
      </div>
      <div className="machine">
        { grid.map((row, rowIdx) => <Row row={row} rowIdx={rowIdx} onSquareUpdate={onSquareUpdate} key={rowIdx}/>)}
      </div>
    </div>
  );
}

export default App;
