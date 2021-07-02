import axios from 'axios';
import qs from 'qs';
import {
  API_URL_PUZZLE,
  API_QUERY_RANDOM,
  API_QUERY_PIECES_RANGE,
  API_QUERY_MOVES_RANGE,
  API_QUERY_RATING_RANGE,
  API_QUERY_THEME,
} from './constants';

const api = axios.create({
  baseURL: API_URL_PUZZLE,
  headers: { Accept: 'application/json' },
});

const queryFormat = {
  arrayFormat: 'comma',
  addQueryPrefix: true,
  encode: process.env.NODE_ENV !== 'development',
};

export const fetchPuzzles = (config, limit) => {
  // DB stores number of total moves in puzzle, not counting first move.
  // We want to limit according to player moves.
  const movesRange = {
    min: 2 * config.movesRange.min - 1,
    max: 2 * config.movesRange.max - 1,
  };

  const filters = {
    [API_QUERY_PIECES_RANGE]: Object.values(config.piecesRange),
    [API_QUERY_MOVES_RANGE]: Object.values(movesRange),
    [API_QUERY_RATING_RANGE]: Object.values(config.ratingRange),
  };

  if (config.matesOnly) {
    filters[API_QUERY_THEME] = 'mate';
  }

  const query = qs.stringify(
    { page_size: limit, page: API_QUERY_RANDOM, ...filters },
    queryFormat,
  );
  return api.get(query);
};
