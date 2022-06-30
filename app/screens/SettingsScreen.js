import React, { useEffect, useState } from 'react';
import { TextInput, View, StyleSheet, Button, Pressable, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { connectAp, getApnames, } from '../actions';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default SettingsScreen = () => {
    const dispatch = useDispatch();

    const [ssid, onChangeSsid] = useState('');
    const [password, onChangePassword] = useState('');

    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        if (ssid)
            setIsEnabled(true);
        else
            setIsEnabled(false);
    }, [ssid]);

    return (
        <View style={{ flex: 1, padding: 25 }}>
            {
                <>
                    <View style={{ backgroundColor: 'white', bottom: '0%' }}>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeSsid}
                            value={ssid}
                            placeholder="SSID of wireless point"
                        />
                        <View>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangePassword}
                                value={password}
                                placeholder="Password"
                                secureTextEntry={true}
                            />
                        </View>
                        <Button title={'Connect'}
                            disabled={!isEnabled}
                            onPress={() => { onChangeSsid(''); onChangePassword(''); dispatch(connectAp(ssid, password)); }} />
                    </View>
                </>

            }
        </View >
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
