import { ofType, combineEpics } from "redux-observable";
import { bufferCount, empty, from, map, mergeAll, of, toArray } from "rxjs";
import { catchError, ignoreElements, mapTo, switchMap, timeout } from "rxjs/operators";
import { ajax } from 'rxjs/ajax';
import { addFavoriteStation, deleteFavorite, getStations, setFavorites, setShowConfirmationDialog } from "./actions";

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

function setStations(stations) {
    return {
        type: 'SET_STATIONS', payload: { stations }
    };
}

let stations = [];
const getStationsEpic = (action$, state$) => action$.pipe(
    ofType('GET_STATIONS'),
    switchMap((a) => {
        if (stations.length == 0 && !!a.payload.limit)
            return ajax.getJSON(`https://de1.api.radio-browser.info/json/stations/bylanguage/${state$.value.stationLanguage}`).pipe(
                map(response =>
                    from(response.map(({ name, url_resolved }) => ({ name, url_resolved })).filter((i) => i.url_resolved.slice(0, 5) == 'http:'))
                        .pipe(
                            bufferCount(a.payload.limit),
                        )
                ),
                mergeAll(),
                toArray(),
                map((result) => {
                    stations = result;
                    return setStations(result[a.payload.offset / 10]);
                })
            )
        else if (a.payload.limit == 0)
            return ajax.getJSON(`https://de1.api.radio-browser.info/json/stations/bylanguage/${state$.value.stationLanguage}`).pipe(
                map(response => (setStations(response))))

        if (stations.length > (a.payload.offset / 10))
            return of(setStations(stations[a.payload.offset / 10]));

        return of(setShowConfirmationDialog(true));
    }
    ),
);

const setLanguageEpic = (action$, state$) => action$.pipe(
    ofType('SET_LANGUAGE'),
    switchMap((a) => {
        if (a.payload.limit > 0)
            return ajax.getJSON(`https://de1.api.radio-browser.info/json/stations/bylanguage/${state$.value.stationLanguage}`).pipe(
                map(response =>
                    from(response.map(({ name, url_resolved }) => ({ name, url_resolved })).filter((i) => i.url_resolved.slice(0, 5) == 'http:'))
                        .pipe(
                            bufferCount(state$.value.limit),
                        )
                ),
                mergeAll(),
                toArray(),
                map((result) => {
                    stations = result;
                    state$.value.offset = 0;
                    return setStations(result[state$.value.offset]);
                })
            )
        else if (a.payload.limit == 0)
            return ajax.getJSON(`https://de1.api.radio-browser.info/json/stations/bylanguage/${state$.value.stationLanguage}`).pipe(
                map(response => (setStations(response))))

        return empty();

    })
);

const setDefaultLimit = (action$, state$) => action$.pipe(
    ofType('RESET_LIMIT'),
    switchMap((action) => {
        return ajax.getJSON(`https://de1.api.radio-browser.info/json/stations/bylanguage/${state$.value.stationLanguage}`).pipe(
            switchMap(response => of(setStations(response.map(({ name, url_resolved }) => ({ name, url_resolved })).filter((i) => i.url_resolved.slice(0, 5) == 'http:')))))
    }));

const setUrlEpic = (action$, state$) => action$.pipe(
    ofType('SET_URL'),
    switchMap((url) => {
        return ajax.get(`http://ztu.local/url?url=${url.url}`).pipe(
            map(res => {
                if (!res.response) {
                    throw new Error();
                }
                return of([]);
            }),
            catchError(() => (empty()))
        )
    }));

const connectToAPEpic = (action$, state$) => action$.pipe(
    ofType('CONNECT_AP'),
    switchMap((params) => {
        return ajax.get(`http://ztu.local/connect?ssid=${params.payload.ssid}&password=${params.payload.password}`)
    })
);

const addToFavoriteEpic = (action$, state$) => action$.pipe(
    ofType('ADD_FAVORITE'),
    switchMap((f) => {
        db.transaction(txn => {
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS favoriteStations (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), url VARCHAR(50))`, [],
                () => console.log("table created successfully"),
                error => console.log("error on creating table " + error.message)),
                txn.executeSql(
                    `INSERT INTO favoriteStations (name, url) VALUES (?, ?)`, [f.name, f.url_resolved],
                    () => console.log(`${f.name} added successfully to favoriteStations`),
                    error => console.log("error on adding favoriteStations " + error.message));
        });

        return of(addFavoriteStation(f.name, f.url_resolved));
    }),
);
const deleteFavoriteEpic = (action$, state$) => action$.pipe(
    ofType('DELETE_FAVORITE'),
    switchMap((f) => {
        db.transaction(txn => {
            txn.executeSql(
                txn.executeSql(
                    `DELETE FROM favoriteStations WHERE name = ?`, [f.name],
                    () => {
                        console.log(`${f.name} deleted successfully from favoriteStations`)
                        return of(deleteFavorite(f.name));
                    },
                    error => console.log("error on deleting favoriteStations " + error.message)));
        });
        return of(deleteFavorite(f.name));
    }),
);
const getFavoriteEpic = (action$, state$) => action$.pipe(
    ofType('GET_FAVORITE'),
    switchMap((f) => {
        var results = [];
        db.transaction(txn => {
            txn.executeSql(
                `SELECT * FROM favoriteStations ORDER BY id DESC`,
                [],
                (sqlTxn, res) => {
                    console.log(sqlTxn);
                    console.log("favoriteStations retrieved successfully");
                    let len = res.rows.length;

                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i);
                            results.push({ name: item.name, url: item.url_resolved });
                        }
                    }
                },
                error => { console.log("error on getting categories " + error.message); return; },
            );
        });
        return setFavorites(results);
    }),
);

export default combineEpics(
    getStationsEpic,
    setLanguageEpic,
    setUrlEpic,
    connectToAPEpic,
    addToFavoriteEpic,
    getFavoriteEpic,
    deleteFavoriteEpic,
    setDefaultLimit,
);
