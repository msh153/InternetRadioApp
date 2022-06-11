import RadioStationsApp from './RadioStationsApp';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux'
import rootReducer from './reducer';
import rootEpic from './epic';
import { createEpicMiddleware } from 'redux-observable';


const App = () => {
    const epicMiddleware = createEpicMiddleware();
    const store = createStore(rootReducer,
        applyMiddleware(epicMiddleware)
    );
    epicMiddleware.run(rootEpic);
    return (
        <Provider store={store} >
            <RadioStationsApp />
        </Provider>
    );
};

export default App;
