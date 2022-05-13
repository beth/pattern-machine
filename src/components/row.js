import { Square } from "./square"

export function Row({row, rowIdx, onSquareUpdate}) {
  return <div className="row">
    {row.map((square, colIdx) => <Square color={square} rowIdx={rowIdx} colIdx={colIdx} onSquareUpdate={onSquareUpdate} key={colIdx}/>)}
  </div>
}