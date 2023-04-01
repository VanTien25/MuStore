import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react';
import database from '@react-native-firebase/database';
import { FlatList } from 'react-native';

const Slider = () => {
    const navigation = useNavigation();
    const [listSlider, setListSlider] = useState([]);

    useEffect(() => {
        database()
            .ref('Slider/')
            .on('value', snapshot => {
                let arr = [];
                snapshot.forEach(child => {
                    var item = child.val();
                    arr.push({
                        id: child.key,
                        image: item.image,
                    })
                })
                setListSlider(arr);
                console.log(arr);
            });
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <View style={{
                width: '100%',
                height: 60,
                backgroundColor: '#AA0000',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 15,
                paddingRight: 15,
                alignItems: 'center',
                marginBottom: 10,
            }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Profile');
                    }}>
                    <Image
                        source={require('../images/back.png')}
                        style={{
                            width: 35,
                            height: 35,
                            tintColor: 'yellow',
                        }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, color: 'yellow', fontWeight: 'bold' }}>Quản lý banner quảng cáo</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('AddBanner');
                    }}
                >
                    <Image
                        source={require('../images/additem.png')}
                        style={{
                            width: 35,
                            height: 35,
                            tintColor: 'yellow'
                        }} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={listSlider}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{
                            width: '100%',
                            alignSelf: 'center',
                            borderBottomWidth: 5,
                            borderBottomColor: '#DDDDDD',
                            backgroundColor: '#fff',
                            paddingTop: 10,
                            paddingBottom: 10,
                        }}>
                            <Text
                                style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, marginLeft: 15 }}
                            >Mã hình ảnh:   {item.id.length > 15 ? item.id.substring(0, 15) + '...' : item.id}</Text>
                            <Image src={item.image}
                                style={{
                                    width: '90%',
                                    height: 250,
                                    resizeMode: 'contain',
                                    alignSelf: 'center',
                                    borderRadius: 10,
                                }} />
                        </View>
                    )
                }} />
        </View>
    )
}

export default Slider