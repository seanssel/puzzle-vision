import { Chess } from 'chessops/chess';
import { parseFen } from 'chessops/fen';
import { parseUci } from 'chessops/util';

export const getFenPosition = (fen) => {
  const setup = parseFen(fen).unwrap();
  return Chess.fromSetup(setup).unwrap();
};

export const getMoves = (uciList) => {
  return uciList.split(' ').map((uci) => parseUci(uci));
};
