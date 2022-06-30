import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, View, Button, Switch, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import OffsetButtons from '../components/OffsetButtons';
import { getStations, setDefaultLimit, setResetLimit, setSelectLanguage } from '../actions';
import ChooseStationModal from '../components/ChooseStationModal';
import Dropdown from '../components/Dropdown';

const languages = [
    { label: 'ukrainian', value: '1' },
    { label: 'english', value: '2' },
    { label: 'british english', value: '3' },
];

export default StationsScreen = () => {
    const stations = useSelector((state) => state.stations);
    const offset = useSelector(state => state.offset);
    const limit = useSelector(state => state.limit);
    const stationLanguage = useSelector(state => state.stationLanguage);
    const [modalStation, setModalStation] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    const [isEnabled, setIsEnabled] = useState(!limit);
    const toggleSwitch = () => {
        setIsEnabled(!isEnabled);
        dispatch(isEnabled ? setDefaultLimit() : setResetLimit())
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getStations(limit, offset));
        debugger
    }, [offset]);


    return (
        <View style={{ flex: 1, padding: 25 }}>
            {
                (!stations?.length) ? <ActivityIndicator size="large" style={{ justifyContent: "center", flexDirection: "row", flex: 1 }} /> : (
                    <>
                        <Dropdown label={'Language: ' + `${stationLanguage || 'Select Language'}`} data={languages} onSelect={(language) => dispatch(setSelectLanguage(language.label, limit))} />
                        <SafeAreaView style={{ justifyContent: 'center', position: 'relative', flexDirection: 'row', margin: 5 }}>
                            <Text>
                                Show all stations at once at the discovery page:
                            </Text>
                            <Switch
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </SafeAreaView>
                        <Text style={{ right: '5%', top: '5%', position: 'absolute' }}>
                            {/* {(limit || limit == 0) ? <>{offset} - {offset + 10}</> : <>0 - {stations && stations?.length}</>} */}
                        </Text>
                        <View style={{ padding: 25, flex: 1 }}>
                            <>
                                <FlatList
                                    data={stations}
                                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around' }}
                                    renderItem={({ item }) => (
                                        // <Button onPress={(e) => Linking.openURL(item.url)} key={item.id} title={item.name}></Button>
                                        <Button onPress={(e) => { setModalStation(item); handleModal(); }} key={item.id} title={item.name}></Button>
                                    )}
                                />
                                {isModalVisible && <ChooseStationModal modalStation={modalStation} isModalVisible={isModalVisible} handleModal={() => handleModal()} add={true} />}
                            </>
                        </View >
                    </>
                )
            }
            {!!limit && <OffsetButtons />}
        </View >
    );
};
