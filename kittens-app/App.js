import React from 'react';
import {Button, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';

import * as firebase from 'firebase';
import Kittens from './Kittens';


// Color Palette
global.darkBlue = '#006187';
global.charcoal = '#4c4c4e';
global.lightblue = '#9aceeb';
global.lightgrey = '#f5f5f5';

const MainScreenNavigator = TabNavigator({
  Kittens: {screen: Kittens}
  // Profile: {screen: ProfileScreen}
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    style: {
      backgroundColor: '#9aceeb',
      height: 65
    },
    labelStyle: {
      marginTop: 3,
      fontSize: 16
    },
    activeTintColor: 'white'
  }
});


const SimpleApp = StackNavigator({
  Home: {screen: MainScreenNavigator}
});

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDMYrx36ZyC3ZLWlGHSYSXN8sAT-emm4UM",
  authDomain: "react-native-workshop-75167.firebaseapp.com",
  databaseURL: "https://react-native-workshop-75167.firebaseio.com",
  projectId: "react-native-workshop-75167",
  storageBucket: "",
  messagingSenderId: "370373012132"
};

export default class App extends React.Component {
  setProfile = (profile) => {
    this.setState({profile});
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loggedIn: false
    };

    firebase.initializeApp(firebaseConfig);
  }

  async componentDidMount() {
    // TODO: designers to find a nice font
    // await Font.loadAsync({
    //   'gilroy-light': require('./assets/fonts/Gilroy-Light.otf'),
    //   'gilroy-bold': require('./assets/fonts/Gilroy-ExtraBold.otf')
    // });
    //
    // this.setState({fontLoaded: true});
  }

  componentDidMount() {
    // Listen for authentication state to change.
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log("We are authenticated now!");
        this.setState({loggedIn: true});
      }
      // Do other things
    });
  };

  render() {
    // wait until the font is loaded
    // if (!this.state.fontLoaded) {
    //   return null;
    // }

    if (!this.state.loggedIn) {
      return (
        <View style={{
          flex: 1,
          padding: 5,
          backgroundColor: '#fafafa',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Image
            style={{marginBottom: 50, width: 250, height: 100}}
            source={require('./logo.png')}
          />
          <Text style={{fontSize: 20, color: 'grey', marginBottom: 10}}>Username /
            Email:</Text>
          <TextInput
            style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
          <Text style={{fontSize: 20, color: 'grey', marginBottom: 10}}>Password:</Text>
          <TextInput
            style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10}}
            onChangeText={(text) => this.setState({pwtext: text})}
            value={this.state.pwtext}
            secureTextEntry
          />
          <Button title='Login' color={global.charcoal} onPress={() => {
            this.setState({loggedIn: true});
          }}/>
        </View>
      );
    }
    // user is logged in
    return <SimpleApp screenProps={{
      data: []
    }}/>;

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
