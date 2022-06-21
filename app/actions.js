export const SET_STATIONS = 'SET_STATIONS';
export const setStations = (stations) => ({
  type: SET_STATIONS,
  payload: { stations },
});

export const setSelectLanguage = (language, limit) => ({
  type: 'SET_LANGUAGE',
  payload: { language, limit },
});

export const setUrl = (url) => ({
  type: 'SET_URL',
  url,
});

export const setLimit = (limit) => ({
  type: 'SET_LIMIT',
  limit,
});

export const setDefaultLimit = () => ({
  type: 'SET_DEFAULT_LIMIT'
});

export const setResetLimit = () => ({
  type: 'RESET_LIMIT'
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
export const getFavorites = () => ({
  type: 'GET_FAVORITES',
});

export const addFavoriteStation = (name, url_resolved) => ({
  type: 'ADD_FAV',
  payload: { name, url_resolved }
});

export const setShowConfirmationDialog = (showConfirmationDialog) => ({
  type: 'SHOW_CONFIRMATION_DIALOG',
  payload: showConfirmationDialog,
});


export const GUEST_SAVE = 'GUEST_SAVE';
export const saveGuest = (fields, shippingFields = null) => {
  const payload = { fields };
  if (shippingFields)
    payload.shippingFields = shippingFields;

  return {
    type: GUEST_SAVE,
    payload,
  };
};

const GET_STATIONS = 'GET_STATIONS';

export function getStations(limit, offset) {
  return {
    type: GET_STATIONS,
    payload: { limit, offset },
  }
}
export const INCREASE_OFFSET = 'INCREASE_OFFSET';
export const DECREASE_OFFSET = 'DECREASE_OFFSET';

