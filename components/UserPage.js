import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
} from 'react-native'
import Users from '../data/Users.json'
import UserList from './UserList';

const UserPage = () => {
    // console.log(Users.txs.id);
    // console.log(Users.txs.phone);
    let users = []
    Object.keys(Users).map(key => {
        users.push(Users[key])
    })
    console.log(users);
    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
    ];
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}> */}
            <View style={[styles.scene, {}]} >
                <Text style={styles.title}>User</Text>
            </View>
            <UserList data={users}></UserList>
            {/* </ScrollView> */}
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    scene: {
        flex: 1
    },
    title: {
        fontSize: 60,
        marginBottom: 15,
    },
})


export default UserPage