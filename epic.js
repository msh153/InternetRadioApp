import { ofType } from "redux-observable";
import { map, mergeMap } from "rxjs";
import { ajax } from 'rxjs/ajax';

function setStations(stations) {
    return {
        type: 'SET_STATIONS', stations: stations
    };
}

const getStationsEpic = (action$, state$) => action$.pipe(
    ofType('GET_STATIONS'),
    mergeMap(() =>
        ajax.getJSON(`https://de1.api.radio-browser.info/json/stations/bylanguage/${state$.value.stationLanguage}?limit=${state$.value.limit}&offset=${state$.value.offset}`).pipe(
            map(response => setStations(
                response.map(({ name, url }) => ({ name, url }))
            ))
        )
    )
);

export default getStationsEpic;
