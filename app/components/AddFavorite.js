import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Text, Alert, View, Button, StyleSheet, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteStation, setShowConfirmationDialog } from '../actions';
import Modal from "react-native-modal";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default AddFavorite = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    const [text, onChangeText] = useState("Useless Text");
    const [number, onChangeNumber] = useState(null);

    const dispatch = useDispatch();
    return (
        <>
            <Modal isVisible={isModalVisible} style={{ opacity: 1, margin: 0 }}>
                <TouchableWithoutFeedback
                    onPressOut={() => handleModal()}
                    activeOpacity={1}
                >
                    <View style={{ with: '100%', height: '100%', justifyContent: 'flex-end', }}>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeText}
                            value={text}
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeNumber}
                            value={text}
                            placeholder="useless placeholder"
                            keyboardType="numeric"
                        />
                        <Button title={'Add'}
                            onPress={() => { dispatch(addFavoriteStation(modalStation.name, modalStation.url_resolved)); handleModal() }} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <View style={{ bottom: 10, flexDirection: 'row', justifyContent: "space-around", alignItems: "flex-end" }}>
                <View style={{ flex: 1 }}>
                    <Button onPress={() => {
                        // if (stations.length > (offset / 10))
                        handleModal()
                    }}
                        title="Add to favorite"
                    ></Button>
                </View >
            </View >
        </>
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
