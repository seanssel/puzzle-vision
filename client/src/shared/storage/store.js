import { PUZZLE_CONFIG } from '../config/defaults';

const KEY_PUZZLES = 'puzzles';
const KEY_ACTIVE_PUZZLE = 'puzzle-active';
const KEY_PUZZLE_HISTORY = 'puzzle-history';
const KEY_NUM_PUZZLES = 'num_puzzles';
const KEY_CONFIG = 'puzzle-config';

const storage = localStorage;

const saveStore = (key, value) => {
  storage.setItem(key, JSON.stringify(value));
};

const getStore = (key) => {
  return JSON.parse(storage.getItem(key));
};

const removeStore = (key) => {
  storage.removeItem(key);
};

const isEmpty = (key) => {
  const value = getStore(key);
  return value === 'undefined' || value === null || value.length === 0;
};

const store = {
  hasPuzzles: () => !isEmpty(KEY_PUZZLES),
  hasActivePuzzle: () => !isEmpty(KEY_ACTIVE_PUZZLE),
  hasConfig: () => !isEmpty(KEY_CONFIG),
  savePuzzles: (puzzles) => saveStore(KEY_PUZZLES, puzzles),
  saveActivePuzzle: (active) => saveStore(KEY_ACTIVE_PUZZLE, active),
  saveNumPuzzles: (num) => saveStore(KEY_NUM_PUZZLES, num),
  saveConfig: (config) => saveStore(KEY_CONFIG, config),
  savePuzzleHistory: (puzzleId) => saveStore(KEY_PUZZLE_HISTORY, puzzleId),
  getPuzzles: () => getStore(KEY_PUZZLES),
  getHistory: () => getStore(KEY_PUZZLE_HISTORY),
  getActivePuzzle: () => getStore(KEY_ACTIVE_PUZZLE),
  getNumPuzzles: () => getStore(KEY_NUM_PUZZLES),

  getConfig: () => {
    if (!store.hasConfig()) {
      store.saveConfig(PUZZLE_CONFIG);
    }
    return getStore(KEY_CONFIG);
  },
  removePuzzles: () => removeStore(KEY_PUZZLES),
  removeActivePuzzle: () => removeStore(KEY_ACTIVE_PUZZLE),
  removeConfig: () => removeStore(KEY_CONFIG),
};

export default store;
