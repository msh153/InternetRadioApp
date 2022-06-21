
import { ActivityIndicator, FlatList, Text, Alert, View, Button, TouchableWithoutFeedback, TouchableOpacity, Linking } from 'react-native';
import { addToFavorite, deletefromFavorites, setUrl } from '../actions';
import Modal from "react-native-modal";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


export default ChooseStationModal = ({ modalStation, isModalVisible, handleModal, add }) => {
  const ButtonTitle = (name) =>
    <Text>Play <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline', fontStyle: 'italic' }}>{name}</Text> on the ESP</Text>
  const dispatch = useDispatch();

  return (
    <Modal isVisible={isModalVisible} style={{ opacity: 1, margin: 0 }}>
      <TouchableWithoutFeedback
        onPressOut={() => handleModal()}
        activeOpacity={1}
      >
        <View style={{ with: '100%', height: '100%', justifyContent: 'flex-end', }}>
          <Button title={ButtonTitle(modalStation.name)}
            onPress={() => { dispatch(setUrl(modalStation.url_resolved)); handleModal() }} />
          {add ?
            <Button title="Add to favorite" onPress={() => { dispatch(addToFavorite(modalStation)); handleModal() }} /> :
            <Button title="Delete from favorites" onPress={() => { dispatch(deletefromFavorites(modalStation.name)); handleModal() }} />}
          <Button title="Open with" onPress={() => { Linking.openURL(modalStation.url_resolved); handleModal() }} />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
