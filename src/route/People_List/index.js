import React from 'react';
import {SafeAreaView, Text, FlatList} from 'react-native';
import {observer} from 'mobx-react';
import store from '../../mobx/store';

@observer
class People_List extends React.Component {
  componentDidMount() {
    store.fetchDataPeople();
  }

  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={store.data}
          keyExtractor={item => item.id}
          renderItem={({item}) => <Text>{item.firstName}</Text>}
        />
      </SafeAreaView>
    );
  }
}

export default People_List;
