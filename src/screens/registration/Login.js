import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
const {width} = Dimensions.get('window');
import {My_Token} from '../../store/action/GettingToken';
import {useDispatch} from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  let regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const loginuser = () => {
    if (!regEmail.test(email)) {
      Alert.alert('unspalsh', 'please enter valid email');
    } else if (!password) {
      Alert.alert('unspalsh', 'please enter password');
    } else {
      setemail('');
      setpassword('');
      dispatch(My_Token(password));
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: '#000000', flex: 1}}>
      <View style={style.mainbox}>
        <Text style={{color: '#fff', fontSize: 25, fontWeight: '600'}}>
          Login
        </Text>
        <TextInput
          value={email}
          placeholderTextColor={'#000'}
          placeholder="email"
          style={style.txtinputbox}
          onChangeText={txt => setemail(txt)}
        />
        <TextInput
          value={password}
          placeholderTextColor={'#000'}
          placeholder="password"
          style={style.txtinputbox}
          onChangeText={txt => setpassword(txt)}
        />

        <TouchableOpacity style={style.loginBtn} onPress={() => loginuser()}>
          <Text style={{color: '#fff'}}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  txtinputbox: {
    backgroundColor: '#fff',
    elevation: 5,
    width: width / 1.2,
    margin: 10,
  },
  mainbox: {
    width: width / 1.2,
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: width / 5,
  },
  loginBtn: {
    backgroundColor: '#2A3747',
    width: width / 2,
    height: width / 10,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;
