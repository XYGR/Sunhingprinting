import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {RootSiblingParent} from 'react-native-root-siblings';
import store from './store';
import AppRouter from './router/Router';

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <RootSiblingParent>
                    <AppRouter/>
                </RootSiblingParent>
            </Provider>
        );
    }
}

export default App;
