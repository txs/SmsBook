/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
  DeviceEventEmitter,
  Dimensions,
} from 'react-native';

// import {
//   Header,
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import moment from 'moment'
import SmsAndroid from 'react-native-get-sms-android';
import { API_URI, FROM, TO, TO_ME } from "@env"
import sendSMSViaTwilio from './sendSMSViaTwilio'
import sendSMSViaDevice from './sendSMSViaDevice'
import SmsServer from './smsServer'
// import { Container, Header, Content, Footer, FooterTab, Icon, Badge, Text, Button } from 'native-base';
import Footer from './components/Footer'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import ChatPage from './components/ChatPage'
import UserPage from './components/UserPage'
import ServerPage from './components/ServerPage'



const App: () => React$Node = () => {
  // console.log(API_URI);
  // console.log(FROM);
  // console.log(TO);
  // const [isEnabled, setIsEnabled] = useState(false);
  console.log('App Refreshed');

  const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]} >
      <Text>chat</Text>
    </View>
  );

  const UserRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} >
      <Text>user</Text>
    </View>
  );

  const initialLayout = { width: Dimensions.get('window').width };

  let users = []
  // An event will be thrown when the sms has been delivered. If the sms was delivered successfully the message will be "SMS delivered" otherwise the message will be "SMS not delivered"
  DeviceEventEmitter.addListener('sms_onDelivery', (msg) => {
    console.log(msg);
  });
  // var filter = {
  //   box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

  //   /**
  //    *  the next 3 filters can work together, they are AND-ed
  //    *  
  //    *  minDate, maxDate filters work like this:
  //    *    - If and only if you set a maxDate, it's like executing this SQL query:
  //    *    "SELECT * from messages WHERE (other filters) AND date <= maxDate"
  //    *    - Same for minDate but with "date >= minDate"
  //    */
  //   // minDate: 1554636310165, // timestamp (in milliseconds since UNIX epoch)
  //   // maxDate: 1556277910456, // timestamp (in milliseconds since UNIX epoch)
  //   // bodyRegex: '(.*)How are you(.*)', // content regex to match

  //   /** the next 5 filters should NOT be used together, they are OR-ed so pick one **/
  //   read: 0, // 0 for unread SMS, 1 for SMS already read
  //   // _id: 1234, // specify the msg id
  //   // thread_id: 12, // specify the conversation thread_id
  //   // address: '+1888------', // sender's phone number
  //   // body: '蝦皮', // content to match
  //   /** the next 2 filters can be used for pagination **/
  //   indexFrom: 0, // start from index 0
  //   maxCount: 10, // count of SMS to return each time
  // };

  // SmsAndroid.list(
  //   JSON.stringify(filter),
  //   (fail) => {
  //     console.log('Failed with this error: ' + fail);
  //   },
  //   (count, smsList) => {
  //     console.log('Count: ', count);
  //     // console.log('List: ', smsList);
  //     var arr = JSON.parse(smsList);

  //     arr.forEach(function (object) {
  //       // if (object.date == "1582529567735") {
  //       // console.log('Object: ' + object);
  //       // console.log('-->' + object.date);
  //       console.log('-->' + object.body);
  //       if (object.body.includes('ch@')) {
  //         console.log('yo!');
  //         const chatMessage = object.body.split('ch@')[1]
  //         console.log(chatMessage);
  //       }
  //       // console.log('-->keys:' + Object.keys(object));
  //       console.log('--------------------------');

  //       // const dateTime = moment(object.date).format('MMMM Do YYYY, h:mm:ss a')
  //       // console.log(dateTime);
  //       // log out what's inside the message
  //       // Object.keys(object).map(function (key) {
  //       //   console.log('--> ' + key + ' : ' + object[key]);
  //       // });
  //       // }
  //     });
  //   },
  // );

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'chat', title: 'Chat' },
    { key: 'user', title: 'User' },
    { key: 'server', title: 'Server' },
  ]);

  const renderScene = SceneMap({
    chat: ChatPage,
    user: UserPage,
    server: ServerPage,
  });

  const getTabBarIcon = (props) => {
    const { route } = props
    if (route.key === 'chat') {
      return <Icon name='comments' size={18} color={'white'} />

    }
    if (route.key == 'user') {
      return <Icon name='user-circle' size={18} color={'white'} />
    }
    if (route.key == 'server') {
      return <Icon name='server' size={18} color={'white'} />
    }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <TabView
          tabBarPosition='bottom'
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={props =>
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: 'red' }}
              renderIcon={
                props => getTabBarIcon(props)
              }
              tabStyle={styles.bubble}
            />
          }
          initialLayout={initialLayout}
        />
      </SafeAreaView>
    </>
  )

  // return (
  //   <>
  //     <StatusBar barStyle="dark-content" />
  //     <SafeAreaView style={{ flex: 1 }}>
  //       <ScrollView
  //         contentInsetAdjustmentBehavior="automatic"
  //         style={styles.scrollView}>
  //         <Header />
  //         {global.HermesInternal == null ? null : (
  //           <View style={styles.engine}>
  //             <Text style={styles.footer}>Engine: Hermes</Text>
  //           </View>
  //         )}
  //         <View style={styles.body}>
  //           <View style={styles.sectionContainer}>
  //             {/* <Button
  //               title="Alert Yo!"
  //               onPress={() => Alert.alert('Yo!')}
  //             /> */}
  //             <SmsServer />
  //             <Button
  //               title="Press me to send by Twilio"
  //               // onPress={() => Alert.alert('Simple Button pressed')}
  //               onPress={() => sendSMSViaTwilio('ch@txs: Hi, txs! what\'s up!', TO_ME)}
  //             />
  //             {/* for spacing */}
  //             <Text style={styles.sectionTitle}>
  //             </Text>
  //             {/* <Button
  //               title="Press me to send by Device SMS"
  //               // onPress={() => Alert.alert('Simple Button pressed')}
  //               onPress={() => sendSMSViaDevice('Device SMS Test! Hi, This is Andy', TO)}
  //             /> */}
  //             {/* <Text style={styles.sectionTitle}>Step One</Text>
  //             <Text style={styles.sectionDescription}>
  //               Edit <Text style={styles.highlight}>App.js</Text> to change this
  //               screen and then come back to see your edits.
  //             </Text> */}
  //           </View>
  //           <View style={styles.sectionContainer}>
  //             <Text style={styles.sectionTitle}>Add User</Text>
  //             <Button title='Add' />
  //           </View>
  //           <View style={styles.sectionContainer}>
  //             <Text style={styles.sectionTitle}>Debug</Text>
  //             <Text style={styles.sectionDescription}>
  //               <DebugInstructions />
  //             </Text>
  //           </View>
  //           <View style={styles.sectionContainer}>
  //             <Text style={styles.sectionTitle}>Learn More</Text>
  //             <Text style={styles.sectionDescription}>
  //               Read the docs to discover what to do next:
  //             </Text>
  //           </View>
  //           <LearnMoreLinks />
  //         </View>
  //       </ScrollView>

  //       <Footer></Footer>
  //     </SafeAreaView>
  //   </>
  // );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  scene: {
    flex: 1
  }
});

export default App;
