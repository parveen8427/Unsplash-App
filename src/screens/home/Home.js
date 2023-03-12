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
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Entypo from 'react-native-vector-icons/dist/Entypo';
const {width, height} = Dimensions.get('window');
import {
  Get_All_Topics,
  Get_All_Photos,
  Get_My_Topis,
  Search_Photos,
} from '../../store/action/GetRequest';
import {useDispatch} from 'react-redux';
import {Log_Out} from '../../store/action/GettingToken';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [SlectedItem, setSlectedItem] = useState(0);
  const [newdata, setnewdata] = useState([]);
  const [newPhotos, setnewPhotos] = useState([]);
  const [heart, setheart] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalProfile, setModalProfile] = useState(false);
  const [count, setcount] = useState(1);
  const [loading, setloading] = useState(false);
  const [topic, settopic] = useState('');
  const [SearchTxt, setSearchTxt] = useState('');

  const Get_Topis = () => {
    dispatch(Get_All_Topics(1)).then(res1 => {
      //   console.log('res--', res1.data);

      dispatch(Get_All_Topics(2)).then(res2 => {
        // console.log('res--', res2.data);
        setnewdata([{id: '', slug: 'Editorial'}, ...res1.data, ...res2.data]);
      });
    });
  };

  const GetTopisData = () => {
    dispatch(Get_My_Topis(topic, count)).then(res => {
      // console.log('-----yy', res);
      setnewPhotos(res?.data);
    });
  };

  const Get_Photos = () => {
    dispatch(Get_All_Photos(count)).then(res => {
      setnewPhotos(res.data);
      //   console.log('res--', res.data);
    });
  };

  useEffect(() => {
    Get_Topis();
    Get_Photos();
    // GetTopisData();
  }, [count, topic]);

  const renderItem = ({item, index}) => {
    // console.log('----', item.id, SlectedItem);
    return (
      <TouchableOpacity
        style={{
          margin: 15,
          borderBottomWidth: item.id == SlectedItem ? 2 : 0,
          height: width / 11,
          justifyContent: 'center',
          borderBottomColor: '#000',
        }}
        onPress={() => {
          setSlectedItem(item.id);
          settopic(item.slug);
        }}>
        <Text style={{color: '#000'}}>{item.slug}</Text>
      </TouchableOpacity>
    );
  };

  const renderItemPhotos = ({item, index}) => {
    // console.log('----', item);
    return (
      <View key={index}>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => {
            navigation.navigate('SinglePhoto', {
              item: item,
            });
          }}>
          <FastImage
            source={{uri: item.urls.thumb}}
            style={{height: width / 1.5, width: '100%'}}
          />
        </TouchableOpacity>

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
      </View>
    );
  };

  const lastItem = () => {
    return (
      <View>
        {loading ? <ActivityIndicator size="large" color="#00ff00" /> : ''}
      </View>
    );
  };

  const handleOnEndReached = () => {
    setloading(true);
    // alert('jjjj');
    // var count = 1;
    setcount(count + 1);
    console.log(count);
    dispatch(Get_All_Photos(count)).then(res => {
      setnewPhotos([...newPhotos, ...res.data]);
      console.log('res--', res.data);
      setloading(false);
    });
  };
  return (
    <SafeAreaView>
      <View style={style.headerBox}>
        <Image
          source={require('../../assets/images/unsplash.png')}
          style={{height: 40, width: 40}}
        />
        <TextInput
          placeholder="Search images"
          style={style.search}
          onChangeText={txt => setSearchTxt(txt)}
        />

        <TouchableOpacity onPress={() => setModalProfile(true)}>
          <Image
            source={require('../../assets/images/userImg.png')}
            style={{height: 40, width: 40}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="ios-reorder-three-sharp" size={40} color={'#000'} />
        </TouchableOpacity>
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={item => item.id}
        data={newdata}
        renderItem={renderItem}
      />

      <FlatList
        contentContainerStyle={{
          paddingBottom: width / 2,
        }}
        showsVerticalScrollIndicator={false}
        data={newPhotos}
        keyExtractor={item => item.id}
        renderItem={renderItemPhotos}
        onEndReached={() => handleOnEndReached()}
        ListFooterComponent={lastItem}
      />

      <View style={style.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <Pressable
            style={style.centeredView}
            onPress={() => setModalVisible(false)}>
            <View style={style.modalView}>
              <View style={{margin: width / 18}}>
                <Text style={style.modalTxt}>View Profile</Text>
                <Text style={style.modalTxt}>Settings</Text>
                <Text style={style.modalTxt}>WishList</Text>
              </View>
            </View>
          </Pressable>
        </Modal>
      </View>

      <View style={style.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalProfile}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setModalProfile(!modalProfile);
          }}>
          <Pressable
            style={style.centeredView}
            onPress={() => setModalProfile(false)}>
            <View style={style.modalView}>
              <TouchableOpacity
                onPress={() => dispatch(Log_Out(null))}
                style={{
                  backgroundColor: '#000000',
                  margin: width / 10,
                  borderRadius: 30,
                  height: width / 11,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={[style.modalTxt, {color: '#fff'}]}>Logout</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
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
    paddingLeft: width / 20,
  },
  photoHeart: {
    // backgroundColor: 'pink',
    width: width / 9,
    height: width / 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: width / 10,
    marginTop: width / 20,
    marginLeft: width / 29,
    borderRadius: 5,
    // borderWidth: 1,
    borderColor: 'gray',
  },

  ////////////modal//////////

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: '#fff',
    height: width / 2,
    width: width / 2,
    borderRadius: 5,
    position: 'absolute',
    top: width / 7,
    left: width / 3.2,
    elevation: 5,
  },
  modalTxt: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
});

export default Home;
