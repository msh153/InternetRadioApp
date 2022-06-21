import React from 'react';
import { ActivityIndicator, FlatList, Text, Alert, View, Button, StyleSheet, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setShowConfirmationDialog } from '../actions';

const increaseOffset = { type: 'INCREASE_OFFSET' };
const decreaseOffset = { type: 'DECREASE_OFFSET' };
const setOffset = (offset) => { type: 'SET_OFFSET', offset };

export default OffsetButtons = () => {
    const offset = useSelector(state => state.offset);
    const showConfirmationDialog = useSelector(state => state.showConfirmationDialog);
    const stations = useSelector(state => state.stations);

    const dispatch = useDispatch();

    const showConfirmDialog = () => {
        return Alert.alert(
            "Thats the final page",
            `Would you like to get to the first?`,
            [
                {
                    text: "Yes",
                    onPress: () => {
                        dispatch(setShowConfirmationDialog(false));
                    },
                },
                {
                    text: "No",
                    onPress: () => {
                        dispatch(setShowConfirmationDialog(false));
                    }
                },
            ]
        );
    };

    return (
        <View style={{ bottom: 10, flexDirection: 'row', justifyContent: "space-around", alignItems: "flex-end" }}>
            {showConfirmationDialog.showConfirmationDialog && showConfirmDialog()}
            {(offset > 0) &&
                <View style={{ flex: 1 }}>
                    <Button onPress={() => dispatch(decreaseOffset)}
                        title="<-Previous"
                    ></Button>
                </View>}
            <View style={{ flex: 1 }}>
                <Button onPress={() => {
                    // if (stations.length > (offset / 10))
                    dispatch(increaseOffset)
                }}
                    title="Next->"
                ></Button>
            </View >
        </View >
    );
};
