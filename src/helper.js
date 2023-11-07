export const BOARD_SIZE = 10; //ex: 5 -> 5x5
export const BEE_ICON = "𓆤";
export const FLAG_ICON = "🚩";
export const BEE_PROBABILITY = 0.15;
export const initialBoard = new Array(BOARD_SIZE).fill(
  new Array(BOARD_SIZE).fill({
    content: "",
    isBee: false,
    revealed: false,
    isFlagged: false,
  })
);

export function countBees(board, i, j) {
  let total = 0;

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (
        i + x >= 0 &&
        i + x < BOARD_SIZE &&
        j + y >= 0 &&
        j + y < BOARD_SIZE
      ) {
        total += board[i + x][j + y].isBee;
      }
    }
  }
  return total || "";
}

export const borderRadiusStyle = (i, j) => {
  if (i === 0 && j === 0) {
    return { borderRadius: "10px 0 0 0" };
  } else if (i === BOARD_SIZE - 1 && j === BOARD_SIZE - 1) {
    return { borderRadius: "0 0 10px 0" };
  } else if (i === 0 && j === BOARD_SIZE - 1) {
    return { borderRadius: "0 10px 0 0" };
  } else if (i === BOARD_SIZE - 1 && j === 0) {
    return { borderRadius: "0 0 0 10px" };
  }
};
