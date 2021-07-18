/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CheckBox, Icon} from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import {RFValue} from 'react-native-responsive-fontsize';

const Picker = ({
  placeholder,
  title,
  data,
  onSelected,
  onSelectAll,
  selectedPicker,
  object,
  object2,
  multiple,
  disabled,
  mode,
  keyItems,
}) => {
  //Local state
  const refRBSheet = useRef();
  //   const [searching, setSearching] = useState('');
  const [newData, setNewData] = useState('');

  //Function
  useEffect(() => {
    setNewData(data);
  }, [data]);

  //   const searchFilterFunction = text => {
  //     setSearching(text);
  //     let itemData = '';
  //     const result = data.filter(item => {
  //       if (object === undefined) {
  //         itemData = `${item.toLowerCase()}`;
  //       } else {
  //         if (object2) {
  //           itemData = `${item[object].toLowerCase()} ${item[
  //             object2
  //           ].toLowerCase()}`;
  //         } else {
  //           itemData = `${item[object].toLowerCase()}`;
  //         }
  //       }
  //       const textData = text.toLowerCase();
  //       return itemData.indexOf(textData) > -1;
  //     });
  //     setNewData(result);
  //   };

  const onPressItem = (itemValue, itemkey) => {
    if (multiple) {
      onSelected(itemValue, itemkey);
    } else {
      onSelected(itemValue);
      refRBSheet.current.close();
    }
  };

  const onPressSelectAll = () => {
    onSelectAll(data);
  };

  return (
    <View
      style={{
        // backgroundColor: items.theme.appColorLighterBackground,
        borderRadius: RFValue(8),
      }}>
      <TouchableOpacity
        disabled={disabled}
        style={styles.picker}
        onPress={() => refRBSheet.current.open()}>
        <Text style={styles.textStyle} numberOfLines={1}>
          {multiple && selectedPicker.length > 0
            ? selectedPicker + ' '
            : placeholder}
        </Text>
        <Icon
          name={'keyboard-arrow-down'}
          //   color={items.theme.appColorTextDark}
        />
      </TouchableOpacity>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        height={Dimensions.get('screen').height / 1.7}
        minClosingHeight={Dimensions.get('screen').height / 2.5}
        customStyles={{
          container: {
            borderTopLeftRadius: RFValue(20),
            borderTopRightRadius: RFValue(20),
            backgroundColor: '#fff',
          },
        }}>
        <View style={styles.titleContainer}>
          {data.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: multiple ? 'space-between' : 'center',
              }}>
              {multiple ? (
                <Text style={[styles.textTitleStyle, {color: 'transparent'}]}>
                  Select all
                </Text>
              ) : null}
              <Text style={styles.textTitleStyle}>{title}</Text>
              {multiple ? (
                <TouchableOpacity onPress={() => onPressSelectAll()}>
                  <Text style={styles.textTitleStyle}>
                    {data.length === selectedPicker.length
                      ? 'Unselect all'
                      : 'Select all'}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          )}
        </View>
        {data.length > 0 ? (
          <ScrollView style={styles.scrollViewStyle}>
            <FlatList
              data={newData}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.listContentContainerStyle}
              renderItem={({item, index}) => (
                <CheckBox
                  title={
                    object
                      ? object2
                        ? item[object] + ' ' + item[object2]
                        : item[object]
                      : item
                  }
                  checked={
                    multiple
                      ? selectedPicker.includes(object ? item[object] : item)
                      : object
                      ? object2
                        ? selectedPicker === item[object] + ' ' + item[object2]
                        : selectedPicker === item[object]
                      : selectedPicker === item
                  }
                  checkedIcon={multiple ? undefined : 'dot-circle-o'}
                  checkedColor="#302E45"
                  uncheckedIcon={multiple ? undefined : 'circle-o'}
                  uncheckedColor="#808080"
                  textStyle={styles.listTextStyle}
                  containerStyle={styles.checkboxContainerStyle}
                  onPress={() =>
                    object
                      ? onPressItem(item[object], item[keyItems])
                      : onPressItem(item)
                  }
                />
              )}
            />
          </ScrollView>
        ) : null}
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    borderRadius: RFValue(8),
    borderWidth: 1,
    borderColor: '#fff',
    maxWidth: Dimensions.get('window').width,
    minWidth: Dimensions.get('window').width * 0.25,
    // width: Dimensions.get('window').width * 0.36,
    padding: RFValue(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textStyle: {
    color: '#302E45',
    fontSize: RFValue(12),

    maxWidth: Dimensions.get('window').width * 0.42,
    minWidth: Dimensions.get('window').width * 0.25,
    // width: Dimensions.get('window').width * 0.25
  },
  listTextStyle: {
    color: '#302E45',
    fontSize: RFValue(12),
  },
  titleContainer: {
    paddingHorizontal: RFValue(14),
    marginTop: RFValue(10),
  },
  textTitleStyle: {
    fontSize: RFValue(12),

    color: '#302E45',
  },
  scrollViewStyle: {marginTop: RFValue(10), paddingHorizontal: RFValue(10)},
  listContentContainerStyle: {padding: RFValue(10)},
  checkboxContainerStyle: {
    marginTop: RFValue(-12),
    marginLeft: RFValue(-10),
    backgroundColor: '#fff',
    borderWidth: 0,
  },
});

export default Picker;
