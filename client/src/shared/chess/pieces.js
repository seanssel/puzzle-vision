import { ReactComponent as WhitePawn } from '../../assets/pieces/wP.svg';
import { ReactComponent as WhiteKnight } from '../../assets/pieces/wN.svg';
import { ReactComponent as WhiteBishop } from '../../assets/pieces/wB.svg';
import { ReactComponent as WhiteRook } from '../../assets/pieces/wR.svg';
import { ReactComponent as WhiteQueen } from '../../assets/pieces/wQ.svg';
import { ReactComponent as WhiteKing } from '../../assets/pieces/wK.svg';
import { ReactComponent as BlackPawn } from '../../assets/pieces/bP.svg';
import { ReactComponent as BlackKnight } from '../../assets/pieces/bN.svg';
import { ReactComponent as BlackBishop } from '../../assets/pieces/bB.svg';
import { ReactComponent as BlackRook } from '../../assets/pieces/bR.svg';
import { ReactComponent as BlackQueen } from '../../assets/pieces/bQ.svg';
import { ReactComponent as BlackKing } from '../../assets/pieces/bK.svg';

const pieceSVG = {
  white: {
    pawn: WhitePawn,
    knight: WhiteKnight,
    bishop: WhiteBishop,
    rook: WhiteRook,
    queen: WhiteQueen,
    king: WhiteKing,
  },
  black: {
    pawn: BlackPawn,
    knight: BlackKnight,
    bishop: BlackBishop,
    rook: BlackRook,
    queen: BlackQueen,
    king: BlackKing,
  },
};

export const getPieceSVG = (color, role) => pieceSVG[color][role];
