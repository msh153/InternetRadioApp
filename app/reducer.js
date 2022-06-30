import { combineReducers } from "redux"
import { INCREASE_OFFSET, DECREASE_OFFSET, SET_STATIONS } from './actions';

const initialState = {
  offset: 0,
  stationAllAtOnce: false,
  stationLanguage: 'ukrainian',
  disabledOffsetButtons: false,
  limit: 10,
  stations: [],
  favoriteStations: [],
  showConfirmationDialog: false,
}

export default combineReducers({
  offset: offsetReducer,
  stations: stationsReducer,
  limit: limitReducer,
  availabilityOffsetButtons: availabilityOffsetButtonsReducer,
  stationLanguage: stationLanguageReducer,
  showConfirmationDialog: showConfirmationDialogReducer,
  favoriteStations: favoriteStationsReducer,
});

function favoriteStationsReducer(state = initialState.favoriteStations, action) {
  switch (action.type) {
    case 'ADD_FAV':
      if (!state.favoriteStations)
        return { favoriteStations: [...state, action.payload] }
      return { ...state, favoriteStations: [...state.favoriteStations, action.payload] }
    case 'SET_FAVORITES':
      return { ...state, favoriteStations: action.payload.stations }
    case 'DELETE_FAV':
      return {
        ...state, favoriteStations: state.favoriteStations.filter(item => item.name !== action.payload.name),
      }
    default: return state
  }
}

function offsetReducer(state = initialState.offset, action) {
  switch (action.type) {
    case INCREASE_OFFSET:
      return state + 10;
    case DECREASE_OFFSET:
      return state - 10;
    case 'SET_DEFAULT_OFFSET':
      return initialState.offset;
  }
  return state;
}

function stationsReducer(state = initialState.stations, action) {
  switch (action.type) {
    case SET_STATIONS: {
      if (action.payload.stations)
        return action.payload.stations
    }
    case 'RESET_STATIONS': {
      return { ...state, stations: null }
    }
  }
  return state;
}

function stationLanguageReducer(state = initialState.stationLanguage, action) {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return action.payload.language;
  }
  return state;
}

function showConfirmationDialogReducer(state = initialState.showConfirmationDialog, action) {
  switch (action.type) {
    case 'SHOW_CONFIRMATION_DIALOG':
      return { showConfirmationDialog: action.payload }
  }
  return state;
}

function limitReducer(state = initialState.limit, action) {
  switch (action.type) {
    case 'SET_DEFAULT_LIMIT':
      return 10
    case 'RESET_LIMIT':
      return 0;
  }
  return state;
}

function availabilityOffsetButtonsReducer(state = initialState.disabledOffsetButtons, action) {
  switch (action.type) {
    case 'SET_ENABLE_OFFSET_BUTTONS':
      return { ...state, disabledOffsetButtons: true }
    case 'SET_DISABLE_OFFSET_BUTTONS':
      return { ...state, disabledOffsetButtons: false }
  }
  return state;
}
