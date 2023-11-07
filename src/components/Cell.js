import React from "react";
import { borderRadiusStyle, FLAG_ICON } from "../helper";

function Cell({
  i,
  j,
  revealed,
  handleRevealClick,
  content,
  isBee,
  isFlagged,
  isWinner,
}) {
  return (
    <div
      className={`Cell ${!revealed && "unrevealed"} ${isBee && "bee"} ${
        isFlagged && !revealed && "flag"
      } ${isWinner && "winner"}`}
      onClick={() => (revealed || isWinner ? null : handleRevealClick(i, j))}
      onContextMenu={(e) => {
        e.preventDefault();
        !isWinner && handleRevealClick(i, j, true);
      }}
      style={borderRadiusStyle(i, j)}
    >
      {revealed ? content : isFlagged ? FLAG_ICON : ""}
    </div>
  );
}

export default React.memo(Cell);
