import React from 'react';
import {Button, Image, Text, TextInput, View} from 'react-native';

export default class Login extends React.Component {
  state = {
    text: '',
    pwtest: ''
  };


  LoginWithGoogle = async (callback) => {
    const result = {
      user: {
        id: '123',
        name: 'mido',
        email: 'whatever@whatever.com'
      }
    };
    try {
      const result = await Expo.Google.logInAsync({
        iosClientId: '1068711084022-gd78sbd2jnq10dfut056hkbqsmj87c73.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });

      if (result.type === 'success') {
        console.log('google result', result);

        // call the callback if its defined
        if (callback) {
          callback();
        }

        // save user info in firebase
        firebase.database().ref(`users/${result.user.id}`).set({
          user: result.user,
          gg_permissions: ['public', 'email']
        });

        // Sign in with credential from the Facebook user.
        firebase.auth().signInWithCredential(credential).catch((error) => {
          // Handle Errors here.
        });
        return result;
      } else {
        return {cancelled: true};
      }
    } catch (e) {
      return {error: true};
    }
  };


  render() {
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
          source={require('./lost_logo.png')}
        />
        <Text style={{fontSize: 20, fontFamily: 'roboto-bold', color: 'grey', marginBottom: 10}}>Username /
          Email:</Text>
        <TextInput
          style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Text style={{fontSize: 20, fontFamily: 'roboto-bold', color: 'grey', marginBottom: 10}}>Password:</Text>
        <TextInput
          style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10}}
          onChangeText={(text) => this.setState({pwtext: text})}
          value={this.state.pwtext}
          secureTextEntry
        />
        <Button title='Login' color={global.charcoal} onPress={this.props.setLoginState}/>
      </View>
    );
  }
}
