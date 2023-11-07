import React from "react";
import Board from "./components/Board";
import { BEE_ICON } from "./helper";

function App() {
  return (
    <div className="App">
      <h2>{`${BEE_ICON} Minesweeper ${BEE_ICON}`}</h2>
      <Board />
    </div>
  );
}

export default App;
