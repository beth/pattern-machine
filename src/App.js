import './App.css';
import { useState } from 'react';

const GRID_SIZE = 9;
const MIN_GRID = 1;
const MAX_GRID = 15;
const MESSAGE_DELAY = 1000;

const SQUARE_COLORS = [
  { 
    className: 'green',
    emoji: '🟩',
  },
  { 
    className: 'yellow',
    emoji: '🟨',
  },
  { 
    className: 'purple',
    emoji: '🟪',
  }
];

const EASTER_EGG_COLORS = ['black', ...SQUARE_COLORS.map(color => color.className)];

const createNewGrid = (num) => {
  const state = [];
  for (let rowIdx = 0; rowIdx < num; rowIdx++) {
    state.push(Array(num).fill(0));
  }
  return state;
};

const convertGridToEmojiString = (grid) => {
  return grid.map(row => {
    return row.map(value => {
      return SQUARE_COLORS[value].emoji;
    }).join('');
  }).join('\n');
}

function Title() {
  const title = 'PATTERN MACHINE';
  const [letters, setLetters] = useState(Array(title.length).fill(0));

  const changeLetter = (index) => {
    const newValue = (letters[index] + 1) % 4;
    const newLetters = letters.map((value, i) => {
      if(i === index) {
        return newValue;
      } else {
        return value;
      }
    });
    setLetters(newLetters);
  };

  return (<h1 class="title">
    {
      title.split('').map((letter, i) => {
        return (<span onClick={() => changeLetter(i)} className={EASTER_EGG_COLORS[letters[i]]}>{letter}</span>)
      })
    }
  </h1>);
}

function Settings({incrementGridSize, gridSize, open}) {
  return (<div className={`settings ${open ? 'slidedown' : 'slideup'}`}>
    Grid Size:
    <i onClick={() => incrementGridSize(-1)} class={`fas fa-minus-circle ${gridSize === MIN_GRID ? 'disabled' : ''}`}></i>
    <span class="gridSize">{gridSize}</span>
    <i onClick={() => incrementGridSize(1)} class={`fas fa-plus-circle ${gridSize === MAX_GRID ? 'disabled' : ''}`}></i>
  </div>);
}

function Message({showMessage}) {
  return <div className={`message ${showMessage ? 'slideright' : 'slideleft'}`}>Pattern Copied!</div>
}

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [gridSize, setGridSize] = useState(GRID_SIZE);
  const [grid, setGrid] = useState(createNewGrid(GRID_SIZE));
  const [showMessage, setShowMessage] = useState(false);

  const onShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), MESSAGE_DELAY);
  }
  const incrementGridSize = (increment) => {
    const newGridSize = gridSize + increment;
    if (newGridSize> MAX_GRID || newGridSize< MIN_GRID) {
      return;
    }
    setGridSize(newGridSize);
    setGrid(createNewGrid(newGridSize));
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

  const shareGrid = () => {
    const text = convertGridToEmojiString(grid);
    const data = { text }
    try {
      window.navigator.canShare(data);
      window.navigator.share(data)
    } catch (e) {
      navigator.clipboard.writeText(text);
      onShowMessage();
    }
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div class="app">
      <div className="sidebar">
        <div class="header">
          <Title />
          <div class="buttons">
            <i onClick={toggleSettings} class={`fas fa-cog fa-2x ${showSettings ? 'selected' : ''}`}></i>
            <i onClick={shareGrid} class="fas fa-share fa-2x"></i>
            <Message showMessage={showMessage}/>
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

function Row({row, rowIdx, onSquareUpdate}) {
  return <div className="row">
    {row.map((square, colIdx) => <Square color={square} rowIdx={rowIdx} colIdx={colIdx} onSquareUpdate={onSquareUpdate} key={colIdx}/>)}
  </div>
}

function Square({color, rowIdx, colIdx, onSquareUpdate}) {
  const onClick = () => {
    let newColor = (color + 1) % SQUARE_COLORS.length;
    onSquareUpdate(rowIdx, colIdx, newColor);
  }
  return (<div className={`square ${SQUARE_COLORS[color].className}`} onClick={onClick}></div>)
}

export default App;
