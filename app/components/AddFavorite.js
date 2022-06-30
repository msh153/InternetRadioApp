
import { View, Button, TextInput, StyleSheet } from 'react-native';
import { addFavoriteStation,  } from '../actions';
import Modal from "react-native-modal";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


export default AddFavorite = ({ isModalVisible, handleModal }) => {
    const dispatch = useDispatch();

    const [name, onChangeName] = useState(null);
    const [url, onChangeUrl] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);

    const handleChange = (url) => {
        onChangeUrl(url);

        setIsDisabled(url.slice(0, 5) === "http:");
    }

    return (
        <Modal isVisible={isModalVisible} style={{ opacity: 1, margin: 0, width: '100%', bottom: 0, position: 'absolute' }}
            onSwipeComplete={() => handleModal()}
            onBackdropPress={() => handleModal()}
            onRequestClose={() => handleModal()}
        >
            <>
                <View style={{ backgroundColor: 'white', bottom: '0%' }}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeName}
                        value={name}
                        placeholder="Name of station"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => handleChange(e)}
                        value={url}
                        placeholder="Url of station"
                    />
                    <Button title={'Add'}
                        disabled={!isDisabled}
                        onPress={() => { handleModal(); onChangeName(null); onChangeUrl(null); return dispatch(addFavoriteStation(name, url)); }} />
                </View>
            </>
        </Modal>
    );
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
