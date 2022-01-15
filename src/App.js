import './App.css';
import { useState } from 'react';

const GRID_SIZE = 9;
const SQUARE_COLORS = [
  { 
    className: 'green',
    emoji: '🟩',
  },
  { 
    className: 'orange',
    emoji: '🟧',
  },
  { 
    className: 'purple',
    emoji: '🟪',
  }
];

const EASTER_EGG_COLORS = ['black', ...SQUARE_COLORS.map(color => color.className)];

const createInitialState = (num) => {
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

  const shareGrid = () => {
    const text = convertGridToEmojiString(grid);
    const data = { text }
    try {
      window.navigator.canShare(data);
      window.navigator.share(data)
    } catch (e) {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div class="app">
      <div className="sidebar">
        <Title />
        <i class="fas fa-cog fa-2x"></i>
        <i onClick={shareGrid} class="fas fa-share fa-2x"></i>
      </div>
      <div className="machine">
        { grid.map((row, rowIdx) => <Row row={row} rowIdx={rowIdx} onSquareUpdate={onSquareUpdate} key={rowIdx}/>)}
        <div className="footer">
          <div>
            Made with 🤖 by Chris Nho and Beth Johnson
          </div>
        </div>
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
