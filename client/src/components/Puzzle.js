import React, { useEffect, useRef, useState } from 'react';
import { getFenPosition } from '../shared/chess/util';
import { makeUci } from 'chessops/util';
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
  ({ puzzle, solution, orientation, getNextPuzzle }) => {
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

    const fenStart = goBack
      ? solution[currMoveIndex + 1].fenEnd
      : solution[currMoveIndex].fenStart;

    const fenEnd = goBack
      ? solution[currMoveIndex + 1].fenStart
      : solution[currMoveIndex].fenEnd;

    const position = getFenPosition(fenEnd);
    const biasWhiteStyle =
      position.board.pieces('white', 'pawn').size() > 3 ? styles.biasWhite : '';

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

    const incCurrMove = () => {
      setCurrMoveIndex((prevMove) => prevMove + 1);
    };

    const decCurrMove = () => {
      setCurrMoveIndex((prevMove) => prevMove - 1);
    };

    const incHighMove = () => {
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
          incHighMove();
          incCurrMove();
        }, OPPONENT_MOVE_TIMEOUT);
      }
    };

    // TODO easier promotion selection
    // currently you have to input the uci form
    const makeMove = (toSquare) => {
      let moveError = true;
      const nextIndex = highMoveIndex + 1;
      if (toSquare && !solved) {
        const nextUci = makeUci(solution[nextIndex].lastMove).toLowerCase();
        const guessUci = fromSquare + toSquare.toLowerCase();
        if (guessUci === nextUci) {
          moveError = false;
          incHighMove();
          setCurrMoveIndex(() => nextIndex);

          if (nextIndex === moveLimit) {
            setSolved(true);
          } else {
            setFromSquare();
            handleOpponentMove();
          }
        }
      }
      handleMoveError(moveError);
    };

    const handleBackMove = () => {
      if (currMoveIndex > 0) {
        setGoBack(true);
        decCurrMove();
      }
    };

    const handleNextMove = () => {
      if ((currMoveIndex < moveLimit) & (currMoveIndex < highMoveIndex)) {
        setGoBack(false);
        incCurrMove();
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
            {boardVisible ? 'Hide ' : 'Show '} Board
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
          >
            <IconPrev className={styles.moveIcon} />
          </Button>
          <Button
            className={styles.moveButton}
            clickAction={handleNextMove}
            ref={moveNextBtn}
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
              <a
                className={styles.gameUrl}
                href={puzzle.gameurl}
                target="_blank"
                rel="noreferrer"
              >
                {puzzle.gameurl}
              </a>
            </div>
          ) : (
            <div className={styles.solution}>
              {solved ? (
                <IconSolved className={styles.puzzleSolved} />
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
                onClick={() => setCurrMoveIndex(() => index)}
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
