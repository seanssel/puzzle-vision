import { useState, useEffect, useCallback } from 'react';
import { fetchPuzzles } from '../api/puzzles';
import { PUZZLE_LIMIT } from '../shared/config/defaults';
import store from '../shared/storage/store';

export const usePuzzleStore = (config, setError, setLoading) => {
  const [puzzle, setPuzzle] = useState(store.getActivePuzzle());
  const [numPuzzlesFound, setNumPuzzlesFound] = useState(store.getNumPuzzles());
  // const unmounted = useRef(false);

  const updatePuzzleStore = useCallback(
    (getNew) => {
      let puzzles;
      let active;

      setError();
      setLoading(true);
      if (store.hasPuzzles()) {
        puzzles = store.getPuzzles();
        if (getNew || !store.hasActivePuzzle()) {
          store.saveActivePuzzle(puzzles.pop());
          store.savePuzzles(puzzles);
        }
        setPuzzle(store.getActivePuzzle());
        setLoading(false);
      } else {
        fetchPuzzles(config, PUZZLE_LIMIT)
          .then((res) => {
            puzzles = res.data.results;
            store.saveNumPuzzles(res.data.count);
            setNumPuzzlesFound(() => res.data.count);
            if (puzzles && puzzles.length) {
              active = puzzles.pop();
              store.saveActivePuzzle(active);
              store.savePuzzles(puzzles);
              setPuzzle(active);
            } else {
              throw Error();
            }
          })
          .catch((error) =>
            setError('No puzzles found. Try adjusting the filter.'),
          )
          .finally(() => setLoading(false));
      }
    },
    [config, setError, setLoading],
  );

  const getNextPuzzle = () => {
    updatePuzzleStore(true);
  };

  useEffect(() => {
    updatePuzzleStore(false);
    // if (!unmounted.current) {
    //   updatePuzzleStore(false);
    // }
    // return () => {
    //   unmounted.current = true;
    // };
  }, [updatePuzzleStore]);

  return [puzzle, getNextPuzzle, numPuzzlesFound];
};
