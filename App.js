import 'react-native-gesture-handler';
import React from 'react';
import StationsScreen from './app/screens/StationsScreen';
import SettingsScreen from './app/screens/SettingsScreen';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux'
import rootReducer from './app/reducer';
import rootEpic from './app/epic';
import { createEpicMiddleware } from 'redux-observable';
import { NavigationContainer } from '@react-navigation/native';
import {
    createDrawerNavigator,
} from '@react-navigation/drawer';
import FavoriteScreen from './app/screens/FavoriteScreen';
import { composeWithDevTools } from 'remote-redux-devtools';

const Drawer = createDrawerNavigator();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const App = () => {
    const epicMiddleware = createEpicMiddleware();
    const store = createStore(rootReducer,
        composeEnhancers(
            applyMiddleware(epicMiddleware)
        ),
    );
    epicMiddleware.run(rootEpic);
    return (
        <Provider store={store} >
            <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen name="Discover stations" component={StationsScreen} />
                    <Drawer.Screen name="Favorite stations" component={FavoriteScreen} />
                    <Drawer.Screen name="Settings" component={SettingsScreen} />
                </Drawer.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
