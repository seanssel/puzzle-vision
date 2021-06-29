import React from 'react';
import { ROLES } from 'chessops/types';
import { makeSquare } from 'chessops/util';
import Piece from './Piece';
import styles from './PieceGroup.module.css';

// Group pieces and corresponding square names by role and color
// input: chessops Board, chessops SquareSet
// output: {pawn: { white: ['a3', d3'], black: ['b5'] }, bishop: ...}
const groupPieces = (board, squares) => {
  let group = ROLES.reduce(
    (acc, role) => ({ ...acc, [role]: { white: [], black: [] } }),
    {},
  );
  for (let sq of squares) {
    const sqName = makeSquare(sq);
    const piece = board.get(sq);
    group[piece.role][piece.color].push(sqName);
  }
  return group;
};

// Only regroup on re-render if squares have changed
const compareBoard = (prev, next) => {
  return prev.squares.equals(next.squares);
};

const PieceGroup = React.memo(({ board, squares, selectSquare }) => {
  const group = groupPieces(board, squares);

  return Object.keys(group).map((role) =>
    Object.keys(group[role]).map((color) => {
      const squares = group[role][color];
      return squares.length ? (
        <li key={`${role}-${color}`} className={styles.piece}>
          <Piece color={color} role={role}>
            <ul className={styles.squares}>
              {squares.map((square) => (
                <li
                  key={square}
                  className={styles.square}
                  onClick={() => selectSquare(square)}
                >
                  {square}
                </li>
              ))}
            </ul>
          </Piece>
        </li>
      ) : (
        ''
      );
    }),
  );
}, compareBoard);

export default PieceGroup;
