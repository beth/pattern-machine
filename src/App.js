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
import { getEasterEggColors } from './colors';

const MESSAGE_DELAY = 1000;

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [gridSize, setGridSize] = useState(GRID_SIZE);
  const [grid, setGrid] = useState(createNewGrid(GRID_SIZE));
  const [showMessage, setShowMessage] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

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

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
  };

  const resetGrid = () => {
    setGrid(createNewGrid(gridSize));
  };

  const onShareGrid = () => {
    shareGrid(grid, onCopy, highContrast);
  }

  return (
    <div className={`app ${highContrast ? 'high-contrast' : ''}`}>
      <div className="sidebar">
        <div className="header">
          <Title colors={getEasterEggColors(highContrast)}/>
          <div className="buttons">
            <div className="left-section">
              <i onClick={toggleSettings} className={`fas fa-border-all fa-2x ${showSettings ? 'selected' : ''}`}></i>
              <i onClick={toggleHighContrast} className="fas fa-circle-half-stroke fa-2x"></i>
              <i onClick={onShareGrid} className="fas fa-share fa-2x"></i>
              <Message showMessage={showMessage}/>
            </div>
            <div className="right-section">
              <i onClick={resetGrid} className="fas fa-trash fa-2x"></i>
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
