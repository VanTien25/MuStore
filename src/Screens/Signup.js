import { View, Text, Image, Alert } from 'react-native'
import React, { useState } from 'react'

import CustomTextInput from '../common/CustomTextInput'
import CommonButton from '../common/CommonButton'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import database from '@react-native-firebase/database';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Signup = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [badEmail, setBadEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [badPassword, setBadPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [badConfirmPassword, setBadConfirmPassword] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const signup = () => {
        setButtonDisabled(true);
        if (email == '') {
            setBadEmail(true);
            setButtonDisabled(false);
        } else {
            setBadEmail(false);
            if (password == '') {
                setBadPassword(true);
                setButtonDisabled(false);
            } else {
                setBadPassword(false);
                if (confirmPassword == '') {
                    setBadConfirmPassword(true);
                    setButtonDisabled(false);
                } else {
                    setBadConfirmPassword(false);
                    if (password !== confirmPassword) {
                        setBadConfirmPassword(true);
                        setButtonDisabled(false);
                    } else {
                        setBadConfirmPassword(false);
                        saveData();
                    }
                }
            }
        }
    };

    // Lưu Data vào firebase
    const saveData = () => {
        auth()
            .createUserWithEmailAndPassword(email, password,)
            .then(() => {
                database()
                    .ref('User/' + firebase.auth().currentUser.uid)
                    .set({
                        email: email,
                        password: password,
                    })
                    .then((error) => {
                        if (error) {
                            alert('Đăng kí không thành công');
                            navigation.goBack();
                        } else {
                            alert('Đăng kí thành công');
                        }
                    });

            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    setButtonDisabled(false);
                    Alert.alert('Địa chỉ email đó đã được sử dụng!');

                }

                if (error.code === 'auth/invalid-email') {
                    setButtonDisabled(false);
                    Alert.alert('Địa chỉ email đó không hợp lệ!');
                }
            });
    };

    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1 }}>
                <Image
                    source={require('../images/playstore.png')}
                    style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 60, borderRadius: 100 }}
                />

                <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 24, fontWeight: '600', color: '#000' }}>
                    Create New Account
                </Text>

                <CustomTextInput
                    placeholder={'Nhập email...'}
                    value={email}
                    onChangeText={txt => {
                        setEmail(txt);
                    }}
                    icon={require('../images/email.png')}
                />

                {
                    badEmail === true && (
                        <Text style={{ marginTop: 10, marginLeft: 30, color: 'red' }}>Hay nhap Email</Text>
                    )
                }

                <CustomTextInput
                    placeholder={'Nhập mật khẩu...'}
                    value={password}
                    onChangeText={txt => {
                        setPassword(txt);
                    }}
                    icon={require('../images/lock.png')}
                />

                {
                    badPassword === true && (
                        <Text style={{ marginTop: 10, marginLeft: 30, color: 'red' }}>Hay nhap Password</Text>
                    )
                }

                <CustomTextInput
                    placeholder={'Xác nhận mật khẩu...'}
                    value={confirmPassword}
                    onChangeText={txt => {
                        setConfirmPassword(txt);
                    }}
                    icon={require('../images/lock.png')}
                />

                {
                    badConfirmPassword === true && (
                        <Text style={{ marginTop: 10, marginLeft: 30, color: 'red' }}>Mat khau khong trung khop</Text>
                    )
                }

                <CommonButton
                    title={'Sign Up'}
                    bgColor={buttonDisabled ? '#8e8e8e' : '#000'}
                    textColor={'#fff'}
                    onPress={() => {
                        signup();
                    }}
                    disabled={buttonDisabled}
                />

                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '800',
                        alignSelf: 'center',
                        marginTop: 20,
                        textDecorationLine: 'underline',
                        marginBottom: 50
                    }}
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    Already have an account?
                </Text>
            </View>
        </ScrollView>
    )
}

export default Signup;