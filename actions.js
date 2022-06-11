export const SET_STATIONS = 'SET_STATIONS';
export const setStations = (stations) => ({
  type: SET_STATIONS,
  payload: { stations },
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

export function getStations() {
  return {
    type: GET_STATIONS
  }
}
export const INCREASE_OFFSET = 'INCREASE_OFFSET';
export const DECREASE_OFFSET = 'DECREASE_OFFSET';

