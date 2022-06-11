import { ActivityIndicator, FlatList, Text, Alert, View, Button, StyleSheet, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const increaseOffset = { type: 'INCREASE_OFFSET' };
const decreaseOffset = { type: 'DECREASE_OFFSET' };
const setOffset = (offset) => { type: 'SET_OFFSET', offset };

export default OffsetButtons = () => {
    const offset = useSelector(state => state.offset);
    const stations = useSelector(state => state.stations);

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

    const dispatch = useDispatch();
    return (
        <View style={{ bottom: 10, flexDirection: 'row', justifyContent: "space-around", alignItems: "flex-end" }}>
            {(offset > 0) &&
                <View style={{ flex: 1 }}>
                    <Button onPress={() => dispatch(decreaseOffset)}
                        title="<-Previous"
                    ></Button>
                </View>}
            <View style={{ flex: 1 }}>
                <Button onPress={() => { dispatch(increaseOffset) }}
                    title="Next->"
                ></Button>
            </View >
        </View >
    );
};
