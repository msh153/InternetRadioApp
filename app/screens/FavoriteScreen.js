import React, { useState } from 'react';
import { FlatList, Text, View, Button } from 'react-native';
import { useSelector } from 'react-redux';
import AddFavorite from '../components/AddFavorite';
import ChooseStationModal from '../components/ChooseStationModal';


export default SettingsScreen = () => {
    const { favoriteStations } = useSelector((state) => state.favoriteStations);

    const [modalStation, setModalStation] = useState();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
    const handleModalCreate = () => setIsModalCreateVisible(() => !isModalCreateVisible);

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
                                    <Button onPress={(e) => { handleModal(); return setModalStation(item); }} key={item.id} title={item.name}></Button>
                                )}
                            />
                            {isModalVisible && <ChooseStationModal modalStation={modalStation} isModalVisible={isModalVisible} handleModal={() => handleModal()} />}
                        </>)
                }
                <View style={{ flex: 1, padding: 25, justifyContent: 'flex-end' }}>
                    <Button onPress={() => { setIsModalCreateVisible(true) }} title='Add to favorite'></Button>
                </View>
                < AddFavorite isModalVisible={isModalCreateVisible} handleModal={() => handleModalCreate()} />
            </>
        </View >
    );
};
