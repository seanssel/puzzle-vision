import React, { useEffect, useRef, useState } from 'react';
import { getFenPosition } from '../shared/chess/util';
import { makeUci, parseUci } from 'chessops/util';
import { ReactComponent as IconPrev } from '../assets/icons/arrow-left.svg';
import { ReactComponent as IconNext } from '../assets/icons/arrow-right.svg';
import { ReactComponent as IconSolved } from '../assets/icons/check.svg';
import Button from './Button';
import PieceGroup from './PieceGroup';
import Board from './Board';
import SquareInput from './SquareInput';
import styles from './Puzzle.module.css';

const ERROR_TIMEOUT = 1000;
const OPPONENT_MOVE_TIMEOUT = 500;

const Puzzle = React.memo(
  ({ puzzle, setPuzzle, solution, orientation, getNextPuzzle }) => {
    const [currMoveIndex, setCurrMoveIndex] = useState(0);
    const [highMoveIndex, setHighMoveIndex] = useState(0);
    const [boardVisible, setBoardVisible] = useState(false);
    const [goBack, setGoBack] = useState(false);
    const [moveError, setMoveError] = useState(false);
    const [fromSquare, setFromSquare] = useState();
    const [solved, setSolved] = useState(false);
    const isOpponentMoving = useRef(false);
    const moveBackBtn = useRef();
    const moveNextBtn = useRef();
    const moveInput = useRef();

    const moveLimit = solution.length - 1;

    let fenStart = solution[currMoveIndex].fenStart;
    let fenEnd = solution[currMoveIndex].fenEnd;

    if (goBack && currMoveIndex !== moveLimit) {
      fenStart = solution[currMoveIndex + 1].fenEnd;
      fenEnd = solution[currMoveIndex + 1].fenStart;
    }

    const position = getFenPosition(fenEnd);
    const biasWhiteStyle =
      position.board.pieces('white', 'pawn').size() > 3 ? styles.biasWhite : '';

    const lichessLinks = (
      <>
        <a
          href={`https://lichess.org/training/${puzzle.puzzleid}`}
          target="_blank"
          rel="noreferrer"
        >
          Puzzle
        </a>
        {' - '}
        <a href={puzzle.gameurl} target="_blank" rel="noreferrer">
          Game
        </a>
      </>
    );

    useEffect(() => {
      const handleArrowKeys = (e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          moveBackBtn.current.click();
        }

        if (e.key === 'ArrowRight') {
          e.preventDefault();
          moveNextBtn.current.click();
        }
      };

      window.addEventListener('keydown', handleArrowKeys);
      return () => {
        window.removeEventListener('keydown', handleArrowKeys);
      };
    }, []);

    const handleNextPuzzle = () => {
      setBoardVisible(false);
      setCurrMoveIndex(0);
      setHighMoveIndex(0);
      setSolved(false);
      setGoBack(false);
      setMoveError(false);
      setFromSquare();
      getNextPuzzle();
      isOpponentMoving.current = false;
    };

    const incCurrMoveIndex = () => {
      setCurrMoveIndex((prevMove) => prevMove + 1);
    };

    const decCurrMoveIndex = () => {
      setCurrMoveIndex((prevMove) => prevMove - 1);
    };

    const incHighMoveIndex = () => {
      setHighMoveIndex((prevHigh) => prevHigh + 1);
    };

    const toggleBoard = () => {
      setGoBack(false);
      setBoardVisible(!boardVisible);
    };

    const handleMoveError = (error) => {
      setMoveError(error);
      if (error) {
        setTimeout(() => {
          setMoveError(false);
        }, ERROR_TIMEOUT);
      }
    };

    const handleOpponentMove = () => {
      if (!isOpponentMoving.current) {
        isOpponentMoving.current = true;
        setTimeout(() => {
          isOpponentMoving.current = false;
          incHighMoveIndex();
          incCurrMoveIndex();
        }, OPPONENT_MOVE_TIMEOUT);
      }
    };

    const handleMoveSuccess = (moveIndex) => {
      incHighMoveIndex();
      setCurrMoveIndex(() => moveIndex);

      if (moveIndex === moveLimit) {
        setSolved(true);
      } else {
        setFromSquare();
        handleOpponentMove();
      }
    };

    const makeMove = (toSquare) => {
      let moveError = true;
      const nextIndex = highMoveIndex + 1;
      const nextUci = makeUci(solution[nextIndex].lastMove).toLowerCase();
      const guessUci = fromSquare + toSquare.toLowerCase();
      const move = parseUci(guessUci);

      if (move && !solved) {
        if (guessUci === nextUci) {
          moveError = false;
          handleMoveSuccess(nextIndex);
        } else if (nextIndex === moveLimit && position.isLegal(move)) {
          // if uci doesn't match, test for checkmate
          position.play(move);
          if (position.isCheckmate()) {
            let newMoves = puzzle.moves.split(' ');
            newMoves.pop();
            newMoves.push(guessUci);
            setPuzzle((prev) => ({ ...prev, moves: newMoves.join(' ') }));
            handleMoveSuccess(nextIndex);
          }
        }
      }
      handleMoveError(moveError);
    };

    const handleBackMove = () => {
      if (currMoveIndex > 0) {
        setGoBack(true);
        decCurrMoveIndex();
      }
    };

    const handleNextMove = () => {
      if ((currMoveIndex < moveLimit) & (currMoveIndex < highMoveIndex)) {
        setGoBack(false);
        incCurrMoveIndex();
      }
    };

    const selectSquare = (square) => {
      setBoardVisible(false);
      setMoveError(false);
      setFromSquare(square);
      if (moveInput.current) {
        moveInput.current.focus();
      }
    };

    return (
      <div className={styles.puzzle}>
        <div className={styles.navButtons}>
          <Button clickAction={toggleBoard}>
            {`${boardVisible ? 'Hide' : 'Show'} Board`}
          </Button>
          <Button clickAction={handleNextPuzzle}>Next Puzzle &raquo;</Button>
        </div>
        <div className={styles.info}>
          Find the best move for{' '}
          <span className={styles.turn}>{orientation}</span>
        </div>
        <div className={styles.moveButtons}>
          <Button
            className={styles.moveButton}
            clickAction={handleBackMove}
            ref={moveBackBtn}
            description="Previous Move"
          >
            <IconPrev className={styles.moveIcon} />
          </Button>
          <Button
            className={styles.moveButton}
            clickAction={handleNextMove}
            ref={moveNextBtn}
            description="Next Move"
          >
            <IconNext className={styles.moveIcon} />
          </Button>
        </div>
        <div className={`${styles.main} ${biasWhiteStyle}`}>
          <ul className={`${styles.group} ${styles.white} ${biasWhiteStyle}`}>
            <PieceGroup
              board={position.board}
              squares={position.board.white}
              selectSquare={selectSquare}
            />
          </ul>
          {boardVisible ? (
            <div id="board" className={styles.board}>
              <Board
                fenStart={fenStart}
                fenEnd={fenEnd}
                lastMove={solution[currMoveIndex].lastMove}
                orientation={orientation}
              />
              <div className={styles.boardLinks}>{lichessLinks}</div>
            </div>
          ) : (
            <div className={styles.solution}>
              {solved ? (
                <>
                  <IconSolved className={styles.iconSolved} />
                  <ul className={styles.solutionInfo}>
                    <li>
                      Rating:{' '}
                      <span className={styles.rating}>{puzzle.rating}</span>
                    </li>
                    <li>{lichessLinks}</li>
                  </ul>
                </>
              ) : isOpponentMoving.current ? (
                <span className={styles.loader} />
              ) : (
                <SquareInput
                  square={fromSquare}
                  makeMove={makeMove}
                  inputRef={moveInput}
                  error={moveError}
                />
              )}
            </div>
          )}
          <ul className={`${styles.group} ${styles.black}`}>
            <PieceGroup
              board={position.board}
              squares={position.board.black}
              selectSquare={selectSquare}
            />
          </ul>
        </div>
        <ol className={styles.moves}>
          {solution.slice(0, highMoveIndex + 1).map((move, index) => (
            <li key={`${index}-${move}`} className={styles.move}>
              <span className={styles.moveIndex}>{index + 1}.</span>
              <div
                className={`${styles.san} ${
                  index === currMoveIndex && styles.currMove
                }`}
                onClick={() => {
                  if (index >= currMoveIndex) {
                    setGoBack(false);
                  }
                  setCurrMoveIndex(() => index);
                }}
              >
                {move.san}
                {index % 2 ? <IconSolved className={styles.moveSolved} /> : ''}
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  },
);

export default Puzzle;
