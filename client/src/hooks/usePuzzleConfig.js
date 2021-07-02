import { useState, useEffect } from 'react';
import store from '../shared/storage/store';

export const usePuzzleConfig = () => {
  const [config, setConfig] = useState(store.getConfig());

  const updateConfig = (piecesRange, movesRange, ratingRange, matesOnly) => {
    store.removePuzzles();
    setConfig({
      piecesRange: piecesRange,
      movesRange: movesRange,
      ratingRange: ratingRange,
      matesOnly: matesOnly,
    });
  };

  useEffect(() => {
    setConfig(() => store.getConfig());
  }, []);

  useEffect(() => {
    store.saveConfig(config);
  }, [config]);

  return [config, updateConfig];
};
