import React from 'react';
import { Alert, View, Button, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultOffset, setShowConfirmationDialog } from '../actions';

const increaseOffset = { type: 'INCREASE_OFFSET' };
const decreaseOffset = { type: 'DECREASE_OFFSET' };

export default OffsetButtons = () => {
    const offset = useSelector(state => state.offset);
    const showConfirmationDialog = useSelector(state => state.showConfirmationDialog);

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
                        dispatch(setDefaultOffset());
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
