export const PUZZLE_LIMIT = 10;
export const PUZZLE_CONFIG = {
  piecesRange: { min: 3, max: 6 },
  movesRange: { min: 1, max: 1 },
  ratingRange: { min: 0, max: 1500 },
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
