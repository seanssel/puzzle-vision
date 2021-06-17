import { useState, useEffect } from 'react';
import { PUZZLE_CONFIG } from '../shared/config/defaults';
import store from '../shared/storage/store';

export const usePuzzleConfig = () => {
  const [config, setConfig] = useState(PUZZLE_CONFIG);

  const updateConfig = (piecesRange, movesRange, matesOnly) => {
    store.removePuzzles();
    setConfig({
      piecesRange: piecesRange,
      movesRange: movesRange,
      matesOnly: matesOnly,
    });
  };

  useEffect(() => {
    const parsed = store.getConfig() || PUZZLE_CONFIG;
    setConfig(parsed);
  }, []);

  useEffect(() => {
    store.saveConfig(config);
  }, [config]);

  return [config, updateConfig];
};
