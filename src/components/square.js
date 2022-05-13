import { SQUARE_COLORS } from "../colors";

export function Square({color, rowIdx, colIdx, onSquareUpdate}) {
  const onClick = () => {
      let newColor = (color + 1) % SQUARE_COLORS.length;
      onSquareUpdate(rowIdx, colIdx, newColor);
  }
  return (<div className={`square ${SQUARE_COLORS[color].className}`} onClick={onClick}></div>)
}