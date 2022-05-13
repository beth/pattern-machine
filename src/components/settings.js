import { MAX_GRID, MIN_GRID } from "../grid-helpers";

export function Settings({incrementGridSize, gridSize, open}) {
  return (<div className={`settings ${open ? 'slidedown' : 'slideup'}`}>
    Grid Size:
    <i onClick={() => incrementGridSize(-1)} class={`fas fa-minus-circle ${gridSize === MIN_GRID ? 'disabled' : ''}`}></i>
    <span class="gridSize">{gridSize}</span>
    <i onClick={() => incrementGridSize(1)} class={`fas fa-plus-circle ${gridSize === MAX_GRID ? 'disabled' : ''}`}></i>
  </div>);
}
  