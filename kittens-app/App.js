import React from 'react';
import {StyleSheet} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
import {Font} from 'expo';

import * as firebase from 'firebase';
import Kittens from './Kittens';
import Login from './Login';


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
      loggedIn: false,
      fontLoaded: false
    };

    firebase.initializeApp(firebaseConfig);
  }

  async componentDidMount() {
    // TODO: designers to find a nice font
    await Font.loadAsync({
      'roboto-light': require('./assets/font/RobotoCondensed-Light.ttf'),
      'roboto-bold': require('./assets/font/RobotoCondensed-Bold.ttf')
    });

    this.setState({fontLoaded: true});

    // Listen for authentication state to change.
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log("We are authenticated now!");
        this.setState({loggedIn: true});
      }
      // Do other things
    });
  }

  setLoginState = (loggedIn) => {
    this.setState({loggedIn});
  };

  render() {
    // wait until the font is loaded
    if (!this.state.fontLoaded) {
      return null;
    }

    if (!this.state.loggedIn) {
      return (
        <Login setLoginState={this.setLoginState}/>
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
