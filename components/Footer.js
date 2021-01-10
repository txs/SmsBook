import React from 'react'
import TabBar from 'react-native-tab-bar-footer'
import Icon from 'react-native-vector-icons/FontAwesome';
// import * as star from '../img/icons/user-circle-o.png';


const star = require('../img/icons/comments-o.png')
const starActive = require('../img/icons/comments.png')
const play = require('../img/icons/user-circle-o.png')
const playActive = require('../img/icons/user-circle.png')
const user = require('../img/icons/server.png')
const userActive = require('../img/icons/server.png')

const Footer = () => {
    const tabs = [
        {
            icon: star,
            activeIcon: starActive,
            title: 'Chat'
        },
        {
            icon: play,
            activeIcon: playActive,
            title: 'User'
        },
        {
            icon: user,
            activeIcon: userActive,
            title: 'Server'

        },
    ]
    return (
        <TabBar onTabChange={(index) => alert(index)} tabs={tabs} />
    )
}

export default Footer