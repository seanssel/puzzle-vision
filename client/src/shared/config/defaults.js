export const PIECES_LIMIT = { min: 3, max: 32 };
export const MOVES_LIMIT = { min: 1, max: 15 };
export const PUZZLE_LIMIT = 10;
export const PUZZLE_CONFIG = {
  piecesRange: { min: 3, max: 6 },
  movesRange: { min: 1, max: 1 },
  matesOnly: true,
};

export const CHESSGROUND_CONFIG = {
  viewOnly: true,
  disableContextMenu: true,
  animation: {
    enabled: true,
    duration: 100,
  },
};
