import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import People_List from './People_List';
import Detail_People from './Detail_People';

const Stack = createStackNavigator();

const Route = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PeopleList"
        component={People_List}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Detail_People"
        component={Detail_People}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Route;
