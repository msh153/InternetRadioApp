import React, { useState } from 'react';
import { Text, View, Switch, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultLimit, setResetLimit } from '../actions';


export default SettingsScreen = () => {
    const { limit } = useSelector((state) => state.limit);
    const dispatch = useDispatch();

    const [isEnabled, setIsEnabled] = useState(!!limit);
    const toggleSwitch = () => {
        setIsEnabled(!isEnabled);
        dispatch(isEnabled ? setDefaultLimit() : setResetLimit())
    };
    return (
        <View style={{ flex: 1, padding: 25 }}>
            {
                <>
                    <Text style={{ right: '50%', top: '5%', position: 'absolute' }}>
                        Show all stations at once at the discovery page: <Switch label="Select Language"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </Text>
                </>

            }
        </View >
    );
};
