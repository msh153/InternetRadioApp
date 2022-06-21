
import { ActivityIndicator, FlatList, Text, Alert, View, Button, TouchableWithoutFeedback, TouchableOpacity, Linking, TextInput, StyleSheet } from 'react-native';
import { addFavoriteStation, addToFavorite, deletefromFavorites, setUrl } from '../actions';
import Modal from "react-native-modal";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


export default ChooseStationModal = ({ isModalVisible, handleModal }) => {
    const dispatch = useDispatch();

    const [name, onChangeName] = useState(null);
    const [url, onChangeUrl] = useState(null);

    return (
        <Modal isVisible={isModalVisible} style={{ opacity: 1, margin: 0 }}>
            <>
                <TouchableWithoutFeedback
                    onPressOut={() => handleModal()}
                    activeOpacity={1}
                >
                    <View style={{ with: '100%', height: '100%', justifyContent: 'flex-end', opacity: 1, }} onStartShouldSetResponder={() => (console.log('asdasd'))}>

                    </View>
                </TouchableWithoutFeedback>
                <View style={{ backgroundColor: 'white', height: '50%' }}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeName}
                        value={name}
                        placeholder="Name of station"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeUrl}
                        value={url}
                        placeholder="Url of station"
                    />
                    <Button title={'Add'}
                        onPress={() => { dispatch(addFavoriteStation(name, url)); handleModal() }} />
                </View>
            </>
        </Modal>
    );
};
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
