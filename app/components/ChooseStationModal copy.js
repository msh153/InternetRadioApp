
import { ActivityIndicator, FlatList, Text, Alert, View, Button, TouchableWithoutFeedback, TouchableOpacity, Linking, TextInput, StyleSheet } from 'react-native';
import { addFavoriteStation, addToFavorite, deletefromFavorites, setUrl } from '../actions';
import Modal from "react-native-modal";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


export default ChooseStationModal = ({ modalStation, isModalVisible, handleModal, add }) => {
  const dispatch = useDispatch();

  const [text, onChangeText] = useState("Useless Text");
  const [number, onChangeNumber] = useState(null);

  return (
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
            value={number}
            placeholder="useless placeholder"
          />
          <Button title={'Add'}
            onPress={() => { handleModal(); return dispatch(addFavoriteStation(modalStation.name, modalStation.url_resolved)); }} />
        </View>
      </TouchableWithoutFeedback>
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
