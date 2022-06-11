import { combineReducers } from "redux"
import { INCREASE_OFFSET, DECREASE_OFFSET, SET_STATIONS } from './actions';

const initialState = {
  offset: 0,
  stationAllAtOnce: false,
  stationLanguage: 'ukrainian',
  disabledOffsetButtons: false,
  limit: 10,
  stations: [],
}

export default combineReducers({
  offset: offsetReducer,
  stations: stationsReducer,
  limit: limitReducer,
  availabilityOffsetButtons: availabilityOffsetButtonsReducer,
  stationLanguage: stationLanguageReducer,
});

function offsetReducer(state = initialState.offset, action) {
  switch (action.type) {
    case INCREASE_OFFSET:
      return state + 10;
    case DECREASE_OFFSET:
      return state - 10;
    case 'SET_OFFSET':
      return { ...state, offset: action.offset }
  }
  return state;
}

function stationsReducer(state = initialState.stations, action) {
  switch (action.type) {
    case SET_STATIONS: {
      return { ...state, stations: action.stations }
    }
    case 'RESET_STATIONS': {
      return { ...state, stations: null }
    }
  }
  return state;
}

function stationLanguageReducer(state = initialState.stationLanguage, action) {
  switch (action.type) {
    case 'SET_STATION_LANGUAGE':
      return { ...state, stationLanguage: action.stationLanguage }
  }
  return state;
}

function limitReducer(state = initialState.limit, action) {
  switch (action.type) {
    case 'SET_LIMIT':
      return { ...state, limit: action.limit }
    case 'SET_DEFAULT_LIMIT':
      return { ...state, limit: 0 }
    case 'RESET_OFFSET':
      return { ...state, limit: null }
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
