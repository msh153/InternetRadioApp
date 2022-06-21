import React, { useState } from 'react';
import { useEffect } from 'react';
import { FlatList, Text, View, Button, Linking } from 'react-native';
import Modal from "react-native-modal";
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'
import { deletefromFavorites, getFavorites, setUrl } from '../actions';
import AddFavorite from '../components/AddFavorite';
import ChooseStationModal from '../components/ChooseStationModal';
import Dropdown from '../components/Dropdown';


export default SettingsScreen = () => {
    const { favoriteStations } = useSelector((state) => state.favoriteStations);

    const [modalStation, setModalStation] = useState();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleModal = () => setIsModalVisible(() => !isModalVisible);


    // const { offset } = useSelector((state) => state.offset);
    // const { stationLanguage } = useSelector((state) => state.stationLanguage);
    // const [selected, setSelected] = useState(undefined);

    const data = [
        { label: 'ukrainian', value: '1' },
        { label: 'english', value: '2' },
        { label: 'british english', value: '3' },
        { label: 'american english', value: '4' },
    ];

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFavorites());
    }, []);

    return (
        <View style={{ flex: 1, padding: 25 }}>
            <>
                {
                    (!favoriteStations?.length) ? <Text>Favorites not found</Text> : (
                        <>
                            <FlatList
                                data={favoriteStations}
                                contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around' }}
                                renderItem={({ item }) => (
                                    // <Button onPress={(e) => Linking.openURL(item.url)} key={item.id} title={item.name}></Button>
                                    <Button onPress={(e) => { setModalStation(item); handleModal(); }} key={item.id} title={item.name}></Button>
                                )}
                            />
                            {isModalVisible && <ChooseStationModal modalStation={modalStation} isModalVisible={isModalVisible} handleModal={() => handleModal()} />}
                        </>)
                }
                < AddFavorite />
            </>
        </View >
    );
};
