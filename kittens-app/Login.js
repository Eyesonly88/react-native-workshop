import React from 'react';
import {Button, Image, Text, TextInput, View} from 'react-native';

export default class Login extends React.Component {
  state = {
    text: '',
    pwtest: ''
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
        <Button title='Login' color={global.charcoal} onPress={this.props.setLoginState}/>
      </View>
    );
  }
}
