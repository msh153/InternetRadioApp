
import { Text, View, Button, TouchableWithoutFeedback, Linking } from 'react-native';
import { addToFavorite, deletefromFavorites, setUrl } from '../actions';
import Modal from "react-native-modal";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


export default ChooseStationModal = ({ modalStation, isModalVisible, handleModal, add }) => {
  const dispatch = useDispatch();
  return (
    <Modal isVisible={isModalVisible} style={{ opacity: 1, margin: 0 }}>
      <TouchableWithoutFeedback
        onPressOut={() => handleModal()}
        activeOpacity={1}
      >
        <View style={{ with: '100%', height: '100%', justifyContent: 'flex-end' }}>
          {/* <Button title={ButtonTitle(modalStation.name)} */}
          <Text style={{ backgroundColor: 'white', textAlign: 'center' }}>Station name: <Text style={{
            fontWeight: 'bold',
            textDecorationColor: "rgb(33, 150, 243)",
            textDecorationLine: 'underline', fontStyle: 'italic'
          }}>{modalStation.name}</Text></Text>
          <Button title={`Play ${modalStation.name} on the ESP`}
            onPress={() => { handleModal(); return dispatch(setUrl(modalStation.url_resolved)) }} />
          {add ?
            <Button title="Add to favorite" onPress={() => { handleModal(); return dispatch(addToFavorite(modalStation)); }} />
            : <Button title="Delete from favorites" onPress={() => { handleModal(); return dispatch(deletefromFavorites(modalStation.name)); }} />}
          <Button title="Open with" onPress={() => { handleModal(); return Linking.openURL(modalStation.url_resolved); }} />
        </View>
      </TouchableWithoutFeedback>
    </Modal >
  );
};
