import React, { useEffect, useState, } from 'react';
import { ActivityIndicator, FlatList, Text, Alert, View, Button, StyleSheet, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import OffsetButtons from './OffsetButtons';
import { fromFetch } from 'rxjs/fetch';
import { mergeMap } from 'rxjs';

export const SET_DISABLE_OFFSET_BUTTONS = 'SET_DISABLE_OFFSET_BUTTONS';
export const disableOffsetButtons = () => ({
    type: SET_DISABLE_OFFSET_BUTTONS,
});

export const SET_ENABLE_OFFSET_BUTTONS = 'SET_ENABLE_OFFSET_BUTTONS';
export const enableOffsetButtons = () => ({
    type: SET_ENABLE_OFFSET_BUTTONS,
});

function setData(stations) {
    return {
        type: 'SET_STATIONS', stations: stations
    };
}
export default RadioStationsApp = () => {
    const { stations } = useSelector((state) => state.stations);
    const [offset, setOffset] = useState(0);
    const [disabledChangingList, setDisabledChangingList] = useState(false);
    const dispatch = useDispatch();

    const showConfirmDialog = () => {
        return Alert.alert(
            "Thats the final page",
            `Would you like to get to the first?`,
            [
                {
                    text: "Yes",
                    onPress: () => {
                        setOffset(0);
                    },
                },
                {
                    text: "No"
                },
            ]
        );
    };

    useEffect(() => {
        setDisabledChangingList(true);
        const subscription = fromFetch('https://de1.api.radio-browser.info/json/stations/bylanguage/ukrainian?limit=2&offset=0')
            .pipe(
                // mergeMap is an operator to do another async task
                mergeMap(response => response.json())
            )
            .subscribe(
                data => {
                    const st = (data.map(i => { const { name, url } = i; return { name, url } }));
                    dispatch(setData(st));
                }
            );
        return () => subscription.unsubscribe();
    }, [offset]);

    return (
        <View style={{ flex: 1, padding: 25 }}>
            {
                !stations ? <ActivityIndicator size="large" style={{ justifyContent: "center", flexDirection: "row", flex: 1 }} /> : (
                    <>
                        <Text style={{ right: '5%', top: '5%', position: 'absolute' }}>{offset}-{offset + 10}</Text>
                        <View style={{ flex: 1, padding: 25 }}>
                            <FlatList
                                stations={stations}
                                contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around' }}
                                renderItem={({ item }) => (
                                    <Button onPress={(e) => Alert.alert(item.url)} key={item.id} title={item.name}></Button>
                                )}
                            />
                        </View >
                    </>
                )
            }
            <View style={{ bottom: 10, flexDirection: 'row', justifyContent: "space-around", alignItems: "flex-end" }}>
                {(offset > 0) &&
                    <View style={{ flex: 1 }}>
                        <Button onPress={() => { setOffset(offset - 10) }}
                            title="<-Previous"
                            disabled={disabledChangingList}
                        ></Button>
                    </View>}
                <View style={{ flex: 1 }}>
                    <Button onPress={() => { (offset % 10 == stations.length - 10) ? setOffset(offset + 10) : showConfirmDialog() }}
                        title="Next->"
                        disabled={disabledChangingList}
                    ></Button>
                </View>
            </View>
        </View >
    );
};
