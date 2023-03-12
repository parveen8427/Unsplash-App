import {View, StatusBar, LogBox} from 'react-native';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './store/Index';
import Login from './screens/registration/Login';
import RNBootSplash from 'react-native-bootsplash';
import Index from './navigation/Index';

const App = () => {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true, duration: 500});
      console.log('Bootsplash has been hidden successfully');
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={'#000000'} />
      <Provider store={store} persistor={persistor}>
        <PersistGate persistor={persistor}>
          <Index />
        </PersistGate>
      </Provider>
    </View>
  );
};

export default App;
