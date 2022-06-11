import { useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, Alert, View, Button, StyleSheet, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import OffsetButtons from './OffsetButtons';
import { getStations } from './actions';


export default RadioStationsApp = () => {
    const { stations } = useSelector((state) => state.stations);

    const offset = useSelector(state => state.offset);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStations());
    }, [offset]);

    return (
        <View style={{ flex: 1, padding: 25 }}>
            {
                (!stations?.length) ? <ActivityIndicator size="large" style={{ justifyContent: "center", flexDirection: "row", flex: 1 }} /> : (
                    <>
                        <Text style={{ right: '5%', top: '5%', position: 'absolute' }}>
                            {/* {(limit || limit == 0) ? <>{offset} - {offset + 10}</> : <>0 - {stations && stations?.length}</>} */}
                        </Text>
                        <View style={{ flex: 1, padding: 25 }}>
                            <FlatList
                                data={stations}
                                contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around' }}
                                renderItem={({ item }) => (
                                    <Button onPress={(e) => Linking.openURL(item.url)} key={item.id} title={item.name}></Button>
                                )}
                            />
                        </View >
                    </>
                )
            }
            <OffsetButtons />
        </View >
    );
};
