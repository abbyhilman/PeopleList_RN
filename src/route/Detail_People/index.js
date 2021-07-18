import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import {API_URL} from '../../constanst/API';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {launchCamera} from 'react-native-image-picker';

const Detail_People = ({route, navigation}) => {
  const {data} = route.params;
  const [detail, setDetail] = useState({});
  const APP_ID = '60f2d817d529f966871fd6cf';
  const [location, setLocation] = useState({});
  const [photo, setPhoto] = useState('');

  const fetchDataDetail = () => {
    Axios.get(`${API_URL}/user/${data.id}`, {
      headers: {'app-id': APP_ID},
    })
      .then(response => {
        setDetail(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchDataDetail();
  }, []);

  Geolocation.getCurrentPosition(info => setLocation(info));

  const addPhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        maxWidth: 200,
        maxHeight: 200,
        quality: 0.5,
        cameraType: 'back',
      },
      response => {
        if (response.didCancel || response.error) {
          alert('Anda tidak memilih photo');
        } else {
          const source = {uri: response.uri};
          const dataImage = {
            uri: response.uri,
            type: response.type,
            name: response.fileName,
          };

          setPhoto(source);
          console.log('dataImage = ', dataImage);
        }
      },
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#d3c7e9',
          flex: 0.3,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          borderRadius: 10,
          margin: 10,
        }}>
        <Image
          source={{uri: detail.picture}}
          style={{width: 120, height: 120, borderRadius: 120 / 2}}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '500',
            }}>
            {detail.title} {detail.firstName} {detail.lastName}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '500',
              marginVertical: 4,
            }}>
            {detail.email}
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#d3c7e9',
          flex: 0.3,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          borderRadius: 10,
          margin: 10,
        }}>
        <Text>Add Photo</Text>
        <View style={styles.photo}>
          <View style={styles.borderPhoto}>
            {photo ? (
              <TouchableOpacity activeOpacity={0.5} onPress={addPhoto}>
                <Image source={photo} style={styles.photoContainer} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity activeOpacity={0.5} onPress={addPhoto}>
                <View style={styles.photoContainer}>
                  <Text style={styles.addPhoto}>Add Photo</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#d3c7e9',
          flex: 0.3,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          borderRadius: 10,
          margin: 10,
        }}>
        <Text>{JSON.stringify(location)}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  photo: {
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 16,
  },
  borderPhoto: {
    borderWidth: 1,
    borderColor: '#8D92A3',
    width: 110,
    height: 110,
    borderRadius: 110,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhoto: {
    fontSize: 14,
    color: '#8D92A3',
    textAlign: 'center',
  },
});

export default Detail_People;
