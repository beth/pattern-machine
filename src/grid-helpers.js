import { getSquareColors } from "./colors";

export const GRID_SIZE = 9;
export const MIN_GRID = 1;
export const MAX_GRID = 15;

export const createNewGrid = (num, oldGrid) => {
  const state = [];
  for (let rowIdx = 0; rowIdx < num; rowIdx++) {
    state.push(Array(num).fill(0));
  }

  if (oldGrid) {
    for (let row = 0; row < num; row++) {
      for (let col = 0; col < num; col++) {
        if (oldGrid[row] && oldGrid[row][col] !== undefined) {
          state[row][col] = oldGrid[row][col];
        }
      }
    }
  }
  return state;
};

export const convertGridToEmojiString = (grid, highContrast) => {
  const colors = getSquareColors(highContrast);
  return grid.map(row => {
    return row.map(value => {
      return colors[value].emoji;
    }).join('');
  }).join('\n');
}
