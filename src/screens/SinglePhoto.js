import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Entypo from 'react-native-vector-icons/dist/Entypo';
const {width, height} = Dimensions.get('window');
import {Get_All_Topics, Get_All_Photos} from '../../store/action/GetRequest';
import {useDispatch} from 'react-redux';

const SinglePhoto = props => {
  const [heart, setheart] = useState(false);
  const item = props.route.params.item;

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={[
          style.photoHeart,
          {
            backgroundColor: heart ? 'crimson' : '#fff',
            borderWidth: heart ? 0 : 1,
          },
        ]}
        onPress={() => setheart(!heart)}>
        <Entypo name="heart" size={22} color={heart ? '#fff' : '#000'} />
      </TouchableOpacity>

      <FastImage
        source={{uri: item.urls.thumb}}
        style={{height: width / 1.5, width: '100%'}}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: width / 20,
        }}>
        <View>
          <Text style={{color: 'gray', fontSize: 16}}>Views</Text>
          <Text style={{color: '#000', fontSize: 18, fontWeight: '500'}}>
            2,548,589
          </Text>
        </View>

        <TouchableOpacity
          style={[style.photoHeart, {borderWidth: 1}]}
          onPress={() => {}}>
          <FontAwesome name="share" size={22} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  headerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'pink',
    paddingLeft: width / 30,
    paddingRight: width / 30,
    //   justifyContent: 'center',
    alignItems: 'center',
    marginTop: width / 25,
  },
  search: {
    width: '60%',
    height: width / 8,
    borderWidth: 1,
    borderRadius: 40,
    backgroundColor: '#EEEEEE',
  },
  photoHeart: {
    // backgroundColor: 'pink',
    width: width / 9,
    height: width / 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: width / 22,
    marginTop: width / 20,
    marginLeft: width / 29,
    borderRadius: 5,
    // borderWidth: 1,
    borderColor: 'gray',
  },
});

export default SinglePhoto;
