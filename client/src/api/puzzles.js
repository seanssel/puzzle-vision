import axios from 'axios';
import qs from 'qs';
import {
  API_URL_PUZZLE,
  API_QUERY_RANDOM,
  API_QUERY_PIECES_RANGE,
  API_QUERY_MOVES_RANGE,
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
  const filters = {
    [API_QUERY_PIECES_RANGE]: Object.values(config.piecesRange),
    [API_QUERY_MOVES_RANGE]: Object.values(config.movesRange),
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
