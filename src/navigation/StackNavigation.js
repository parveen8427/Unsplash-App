import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home/Home';
import Login from '../screens/registration/Login';
import SignUp from '../screens/registration/SignUp';
import SinglePhoto from '../screens/SinglePhoto';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const mytoken = useSelector(state => state.MyReducer.token);

  console.log('----', mytoken);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {mytoken ? (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SinglePhoto" component={SinglePhoto} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;
