export const setUrl = (url) => ({
  type: 'SET_URL',
  url,
});

export const setDefaultLimit = () => ({
  type: 'SET_DEFAULT_LIMIT'
});

export const setResetLimit = () => ({
  type: 'RESET_LIMIT'
});

export const setSelectLanguage = (language, limit) => ({
  type: 'SET_LANGUAGE',
  payload: { language, limit },
});


export const addToFavorite = ({ name, url_resolved }) => ({
  type: 'ADD_FAVORITE',
  name, url_resolved,
});

export const deletefromFavorites = (name) => ({
  type: 'DELETE_FAVORITE',
  name,
});

export const deleteFavorite = (name) => ({
  type: 'DELETE_FAV',
  payload: { name },
});

export const setFavorites = (stations) => ({
  type: 'SET_FAVORITES',
  payload: { stations },
});
export const setDefaultOffset = () => ({
  type: 'SET_DEFAULT_OFFSET',
});

export const connectAp = (ssid, password) => ({
  type: 'CONNECT_AP',
  payload: { ssid, password },
});

export const addFavoriteStation = (name, url_resolved) => ({
  type: 'ADD_FAV',
  payload: { name, url_resolved }
});

export const setShowConfirmationDialog = (showConfirmationDialog) => ({
  type: 'SHOW_CONFIRMATION_DIALOG',
  payload: showConfirmationDialog,
});

const GET_STATIONS = 'GET_STATIONS';

export function getStations(limit, offset) {
  return {
    type: GET_STATIONS,
    payload: { limit, offset },
  }
}
export const INCREASE_OFFSET = 'INCREASE_OFFSET';
export const DECREASE_OFFSET = 'DECREASE_OFFSET';
export const SET_STATIONS = 'SET_STATIONS';

