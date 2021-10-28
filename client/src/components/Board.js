import { useEffect, useRef } from 'react';
import { Chessground } from 'chessground';
import { CHESSGROUND_CONFIG } from '../shared/config/defaults';
import { parseFen } from 'chessops/fen';
import { Chess } from 'chessops/chess';
import { chessgroundMove } from 'chessops/compat';
import '../assets/styles/chessground/base.css';
import '../assets/styles/chessground/theme.css';

const Board = ({ fenStart, fenEnd, lastMove, orientation }) => {
  const boardContainer = useRef();

  const setupStart = parseFen(fenStart).unwrap();
  const setupEnd = parseFen(fenEnd).unwrap();
  const positionStart = Chess.fromSetup(setupStart).unwrap();
  const positionEnd = Chess.fromSetup(setupEnd).unwrap();
  const cgMove = chessgroundMove(lastMove);

  const config = {
    ...CHESSGROUND_CONFIG,
    fen: fenStart,
    turnColor: positionStart.turn,
    orientation: orientation,
  };

  useEffect(() => {
    const cg = Chessground(boardContainer.current, config);
    cg.set({
      ...config,
      fen: fenEnd,
      lastMove: cgMove,
      turnColor: positionEnd.turn,
      check: positionEnd.isCheck(),
    });
    return () => {
      cg.destroy();
    };
  });

  return <div ref={boardContainer} />;
};

export default Board;
