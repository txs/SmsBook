import React, { useRef, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Button,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    TextInput,
    ScrollView,
    Modal,
} from 'react-native'
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import sendSMSViaTwilio from '../sendSMSViaTwilio'
import PhoneInput from "react-native-phone-number-input";
import { API_URI, FROM, TO, TO_ME } from "@env"
import ChatList from './ChatList';

import Icon from 'react-native-vector-icons/FontAwesome'


const ChatPage = () => {
    const [userid, setUserid] = React.useState('Please type in target user id: eg. johndoe');
    const [message, setMessage] = React.useState('Please type in message you would like to send.');
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [showAddPage, setShowAddPage] = useState(false);
    const phoneInput = useRef(null);
    const data = [{
        id: 'txs',
        name: 'Andy Tseng',
        phone: '0912345'
    }]
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                <View style={[styles.scene, {}]} >
                    <Text style={styles.title}>Chat</Text>
                    <TouchableOpacity
                        style={styles.add}
                        onPress={() => setShowAddPage(true)}>
                        <Icon name="plus" size={50} color={'white'} />
                    </TouchableOpacity>
                    <ChatList data={data}></ChatList>
                    {showMessage && (
                        <View style={styles.message}>
                            <Text>Value : {value}</Text>
                            <Text>Formatted Value : {formattedValue}</Text>
                            <Text>Valid : {valid ? "true" : "false"}</Text>
                        </View>
                    )}

                </View>
            </ScrollView>
            <Modal
                transparent={true}
                visible={showAddPage}
            >
                <View style={styles.modalBg}>
                    <View style={styles.modalBgWhite}>
                        <TouchableOpacity
                            style={styles.delete}
                            onPress={() => setShowAddPage(false)}>
                            <Icon name="times" size={25} color={'black'} />
                        </TouchableOpacity>
                        <ScrollView
                            contentInsetAdjustmentBehavior="automatic"
                            style={styles.scrollView}>
                            <View style={styles.phoneInput}>
                                <Text>Target ch@t user</Text>
                                <TextInput
                                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 15, width: 290 }}
                                    onChangeText={text => setUserid(text)}
                                    value={userid}
                                >
                                </TextInput>
                                <Text>Target ch@t phone server</Text>
                                <PhoneInput
                                    ref={phoneInput}
                                    defaultValue={value}
                                    defaultCode="TW"
                                    layout="first"
                                    onChangeText={(text) => {
                                        // const checkValid = phoneInput.current?.isValidNumber(value);
                                        const checkValid = phoneInput.current?.isValidNumber(text);
                                        // console.log(checkValid);
                                        // console.log(text);
                                        setValid(checkValid ? checkValid : false);
                                        setValue(text);
                                        console.log(formattedValue);
                                    }}
                                    onChangeFormattedText={(text) => {
                                        setFormattedValue(text);
                                    }}
                                    withDarkTheme
                                    withShadow
                                    autoFocus
                                />
                                {valid ? <Text style={styles.hint}>Valid Phone Number!</Text> : <Text style={styles.hint}>Invalid Phone Number. Please correct it!</Text>}

                                {/* <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        const checkValid = phoneInput.current?.isValidNumber(value);
                        console.log('value:' + value);
                        setShowMessage(true);
                        setValid(checkValid ? checkValid : false);
                    }}
                >
                    <Text>Check</Text>
                </TouchableOpacity> */}
                                <Text>What message you would like to send?</Text>
                                <TextInput
                                    style={{ borderColor: 'gray', borderWidth: 1, marginBottom: 15, width: 290 }}
                                    onChangeText={text => setMessage(text)}
                                    multiline
                                    numberOfLines={4}
                                    editable
                                    maxLength={40}
                                    value={message}
                                >
                                </TextInput>
                            </View>

                            <Text></Text>
                            <Button
                                title="Press me to send by Device SMS"
                                // onPress={() => Alert.alert('Simple Button pressed')}
                                onPress={() => sendSMSViaTwilio('ch@' + userid + ':' + message, formattedValue)}
                            />
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </SafeAreaView >
    )
};

const { height } = Dimensions.get('window');


const styles = StyleSheet.create({
    title: {
        fontSize: 60,
        marginBottom: 15,
    },
    scene: {
        flex: 1
    },
    phoneInput: {
        marginLeft: height * 0.03,
    },
    hint: {
        marginTop: height * 0.03,
        marginBottom: 15,
    },
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    modalBg: {
        backgroundColor: "#000000aa",
        flex: 1,
    },
    modalBgWhite: {
        backgroundColor: Colors.lighter,
        margin: 10,
        padding: 10,
        paddingTop: 40,
        marginBottom: 10,
        borderRadius: 10,
        flex: 1
    },
    delete: {
        position: 'absolute',
        right: 15,
        top: 15,
    },
    add: {
        backgroundColor: '#aaaaff',
        marginTop: 10,
        padding: 10,
        paddingTop: 6,
        paddingBottom: 5,
        borderRadius: 30,
        position: 'absolute',
        right: 15,
        top: 15,
    }
})


export default ChatPage