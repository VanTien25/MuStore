import { View, Text, Image, FlatList, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native';
import CategoryCart from '../common/CategoryCart';

const Category = ({ route }) => {

  const [dataPro, setData] = useState(route.params.listProduct);
  const [nameCat, setNameCat] = useState(route.params.name);

  // console.log(data);

  const navigation = useNavigation();

  return (
    <>
      <View
        style={{
          height: 70,
          backgroundColor: '#AA0000',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          padding: 15
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={require('../images/back.png')}
            style={{
              width: 35,
              height: 35,
              tintColor: '#fff'
            }}
          />
        </TouchableOpacity>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'yellow' }}>{nameCat}</Text>
        <ImageBackground
          source={require('../images/setting.png')}
          style={{
            width: 35,
            height: 35,
            tintColor: 'yellow',
          }}
        >
        </ImageBackground>
      </View>

      <ScrollView style={{ flex: 1, marginBottom: 20, paddingTop: 15}}>
        {
          dataPro.map((item) => {
            if (item.category == nameCat) {
              return (<CategoryCart item={item} />)
            }
          })
        }
      </ScrollView>
    </>
  )
}

export default Category