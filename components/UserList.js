import { Right } from 'native-base';
import React from 'react'
import {
    FlatList,
    View,
    Text,
    StyleSheet,
} from 'react-native'
import UserDelete from './UserDelete';



const UserList = ({ data, userDeleteAction }) => {
    const Item = ({ id, name, phone }) => (
        <View style={styles.item}>
            <Text style={styles.title}>id: {id}</Text>
            <Text style={styles.title}>name: {name}</Text>
            <Text style={styles.title}>phone: {phone}</Text>
            <UserDelete id={id} userDeleteAction={userDeleteAction}></UserDelete>
        </View>
    );

    const renderItem = ({ item }) => {
        // console.log(item);
        return (
            <Item
                id={item.id}
                name={item.name}
                phone={item.phone}
            />
        )
    }


    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 25,
    },
})

export default UserList