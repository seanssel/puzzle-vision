import { useState } from 'react';
import { usePuzzleStore } from '../hooks/usePuzzleStore';
import { usePuzzleConfig } from '../hooks/usePuzzleConfig';
import { makeFen, parseFen } from 'chessops/fen';
import { makeSan } from 'chessops/san';
import { getFenPosition, getMoves } from '../shared/chess/util';
import Menu from './Menu';
import Puzzle from './Puzzle';
import styles from './App.module.css';

function App() {
  const [config, updateConfig] = usePuzzleConfig();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [puzzle, setPuzzle, getNextPuzzle, numPuzzlesFound] = usePuzzleStore(
    config,
    setError,
    setLoading,
  );
  let puzzleMain;

  if (puzzle) {
    const position = getFenPosition(puzzle.fen);
    const moves = getMoves(puzzle.moves);

    const solution = moves.map((move) => {
      const fenStart = makeFen(position.toSetup());
      const san = makeSan(position, move);
      position.play(move);
      return {
        fenStart: fenStart,
        fenEnd: makeFen(position.toSetup()),
        lastMove: move,
        san: san,
      };
    });

    // Use player orientation
    const orientation = parseFen(solution[1].fenStart).unwrap().turn;

    puzzleMain = loading ? (
      <span className={styles.loader} />
    ) : error ? (
      <span className={styles.error}>{error}</span>
    ) : (
      <Puzzle
        puzzle={puzzle}
        setPuzzle={setPuzzle}
        solution={solution}
        orientation={orientation}
        getNextPuzzle={getNextPuzzle}
      />
    );
  } else {
    puzzleMain = <span className={styles.loader} />;
  }

  return (
    <>
      <header className={styles.header}>
        <Menu updateConfig={updateConfig} numPuzzlesFound={numPuzzlesFound} />
      </header>
      <div className={styles.main}>{puzzleMain}</div>
    </>
  );
}

export default App;
