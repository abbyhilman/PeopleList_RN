import React from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  View,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Axios from 'axios';
import {API_URL} from '../../constanst/API';
import {Picker} from '../../component';

const APP_ID = '60f50c6c6353de5cb73e3a7d';
const locationProvince = [
  'Denmark',
  'Netherlands',
  'Brazil',
  'Spain',
  'Germany',
];
const locationDistrict = [
  'Kongsvinger',
  'Den Bommel',
  'Recife',
  'LogroÃ±o',
  'GrÃ¼nhain-Beierfeld',
];
const lcoationSubDistrict = [
  'Nordjylland',
  'Gelderland',
  'CearÃ¡',
  'Islas Baleares',
  'Sachsen-Anhalt',
];
const locationVillages = [
  'SÃ¸ndermarksvej',
  'Dilledonk-Zuid',
  'Rua Carlos Gomes',
  'Calle Mota',
  'MÃ¼hlenweg',
];
const postalCode = ['9614', '1371', '8750', '7675', '1196'];

class People_List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataLocation: [],
      isLoading: false,
      selectedCity: 'Denmark',
      selectedDistrict: 'Kongsvinger',
      selectedSubDistrict: 'Nordjylland',
      selectedVillage: 'SÃ¸ndermarksvej',
      selectedPostal: '9614',
      selectedData: [],
    };
  }

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.log(err);
    }
  };

  fetchDataPeople() {
    this.setState({isLoading: true});
    Axios.get(`${API_URL}/user?limit=10`, {
      headers: {'app-id': APP_ID},
    })
      .then(response => {
        this.setState({data: response.data.data});
        this.setState({isLoading: false});
      })
      .catch(err => {
        console.log(err);
        this.setState({isLoading: false});
      });
  }

  onSort() {
    this.setState({
      selectedData: this.state.selectedData.push(
        this.state.selectedCity,
        this.state.selectedDistrict,
        this.state.selectedSubDistrict,
        this.state.selectedVillage,
        this.state.selectedPostal,
      ),
    });

    this.setState({isLoading: true});
    let tempData = [];

    this.state.data.map(item => {
      Axios.get(`${API_URL}/user/${item.id}`, {
        headers: {'app-id': APP_ID},
      })
        .then(response => {
          tempData.push(response.data);
          // console.log(tempData);
          const filterResult = tempData.filter(val => {
            const itemData = `${val.location.city} ${val.location.state} ${val.location.country} ${val.location.street}`;
            return itemData.indexOf(this.state.selectedData) > -1;
          });

          this.setState({dataLocation: filterResult});
          this.setState({selectedData: []});
          this.setState({isLoading: false});
        })
        .catch(err => {
          console.log(err);
          this.setState({isLoading: false});
        });
    });

    console.log(this.state.selectedData);

    // const usersWithDetails = Promise.allSettled(fetchAllDetails);
  }

  componentDidMount() {
    this.fetchDataPeople();
    if (Platform.OS === 'android') {
      this.requestCameraPermission();
    }
  }

  titleCase(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }

  onValueChanged(value) {
    this.setState({
      selectedCity: value,
    });
  }

  onValueChangedDistrict(value) {
    this.setState({
      selectedDistrict: value,
    });
  }

  onValueChangedSubDistrict(value) {
    this.setState({
      selectedSubDistrict: value,
    });
  }

  onValueChangedVillage(value) {
    this.setState({
      selectedVillage: value,
    });
  }

  onValueChangedPostal(value) {
    this.setState({selectedPostal: value});
  }

  renderPeopleList = item => {
    return (
      <>
        <TouchableOpacity
          style={{
            flexDirection: 'column',
            padding: 10,
            backgroundColor: '#fff',
            margin: 8,
            borderRadius: 10,
            shadowColor: '#ade6e6',
            shadowOffset: {width: 5, height: 5},
            shadowOpacity: 0.8,
            shadowRadius: 3,
            elevation: 5,
          }}
          onPress={() =>
            this.props.navigation.navigate('Detail_People', {data: item})
          }>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{uri: item.picture}}
              style={{width: 70, height: 70, borderRadius: 70 / 2}}
            />
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                marginLeft: 20,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                }}>
                {this.titleCase(item.title)} {item.firstName} {item.lastName}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                }}>
                {item.email}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  renderSortLocation(item) {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'column',
          padding: 10,
          backgroundColor: '#fff',
          margin: 8,
          borderRadius: 10,
          shadowColor: '#ade6e6',
          shadowOffset: {width: 5, height: 5},
          shadowOpacity: 0.8,
          shadowRadius: 3,
          elevation: 5,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              marginLeft: 20,
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '500',
              }}>
              {item.city}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#d3c7e9'}}>
        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 8,
              marginVertical: 10,
            }}>
            <Text>Province</Text>
            <Picker
              placeholder={
                this.state.selectedCity === ''
                  ? 'Province'
                  : this.state.selectedCity
              }
              title={'Select Province'}
              data={locationProvince}
              onSelected={(itemValue, itemIndex) =>
                this.onValueChanged(itemValue)
              }
              selectedPicker={this.state.selectedCity}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 8,
            }}>
            <Text>District</Text>
            <Picker
              placeholder={
                this.state.selectedDistrict === ''
                  ? 'District'
                  : this.state.selectedDistrict
              }
              title={'Select District'}
              data={locationDistrict}
              onSelected={(itemValue, itemIndex) =>
                this.onValueChangedDistrict(itemValue)
              }
              selectedPicker={this.state.selectedDistrict}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 8,
              marginVertical: 10,
            }}>
            <Text>Sub District</Text>
            <Picker
              placeholder={
                this.state.selectedSubDistrict === ''
                  ? 'Sub District'
                  : this.state.selectedSubDistrict
              }
              title={'Select Sub District'}
              data={lcoationSubDistrict}
              onSelected={(itemValue, itemIndex) =>
                this.onValueChangedSubDistrict(itemValue)
              }
              selectedPicker={this.state.selectedSubDistrict}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 8,
              marginVertical: 10,
            }}>
            <Text>Villages</Text>
            <Picker
              placeholder={
                this.state.selectedVillage === ''
                  ? 'Villages'
                  : this.state.selectedVillage
              }
              title={'Select Villages'}
              data={locationVillages}
              onSelected={(itemValue, itemIndex) =>
                this.onValueChangedVillage(itemValue)
              }
              selectedPicker={this.state.selectedVillage}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 8,
              marginVertical: 10,
            }}>
            <Text>Postal Code</Text>
            <Picker
              placeholder={
                this.state.selectedPostal === ''
                  ? 'Postal Code'
                  : this.state.selectedPostal
              }
              title={'Select Postal Code'}
              data={postalCode}
              onSelected={(itemValue, itemIndex) =>
                this.onValueChangedPostal(itemValue)
              }
              selectedPicker={this.state.selectedPostal}
            />
          </View>
          <TouchableOpacity
            style={{alignItems: 'flex-end', margin: 10}}
            onPress={() => this.onSort()}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
        {!this.state.isLoading ? (
          this.state.dataLocation.length ? (
            <FlatList
              data={this.state.dataLocation}
              keyExtractor={item => item.id}
              renderItem={({item}) => this.renderPeopleList(item)}
            />
          ) : (
            <FlatList
              data={this.state.data}
              keyExtractor={item => item.id}
              renderItem={({item}) => this.renderPeopleList(item)}
            />
          )
        ) : (
          <ActivityIndicator color="#000" />
        )}
      </SafeAreaView>
    );
  }
}

export default People_List;
