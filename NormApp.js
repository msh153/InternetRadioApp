import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, Alert, View, Button, Linking, StyleSheet, TextInput } from 'react-native';

export default NormApp = () => {
    const [stations, setStations] = useState([]);
    const [offset, setOffset] = useState(0);
    const [disabledChangingList, setDisabledChangingList] = useState(false);

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
        async function fetchStations() {
            const response = await fetch(`https://de1.api.radio-browser.info/json/stations/bylanguage/ukrainian?limit=10&offset=${offset}`);
            const stationsList = await response.json();
                setStations(stationsList.map(i => { const { name, url } = i; return { name, url } })) // stationsList.map(({name, url}) => {return {name, url }})


            setDisabledChangingList(false);
        }
        setTimeout(() => {
            fetchStations();
        }, 500);
        
        return () => setStations([]);
    }, [offset]);

    return (
        <View style={{ flex: 1, padding: 25 }}>
            {
                stations.length == 0 ? <ActivityIndicator size="large" style={{ justifyContent: "center", flexDirection: "row", flex: 1 }} /> : (
                    <>
                        <View style={{ flex: 1, padding: 25 }}>
                            <FlatList
                                data={stations}
                                contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around' }}
                                renderItem={({ item }) => (
                                    <Button onPress={() => Linking.openURL(item.url)} key={item.id} title={item.name}></Button>
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
