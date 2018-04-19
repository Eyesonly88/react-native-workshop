import React from 'react';
import {Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';


const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

class MyListItem extends React.PureComponent {
  _onPress = () => {
    // go somewhere
  };

  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        margin: 5,
        alignItems: 'center',
        backgroundColor: this.props.index % 2 === 0 ? global.lightgrey : 'white'
      }}>

        <View style={{flex: 0.5, padding: 5, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
          <TouchableOpacity onPress={this._onPress}>
            <View style={{flex: 1, margin: 3, padding: 10, borderColor: 'grey', borderRadius: 5, flexWrap: 'wrap'}}>
              <Text style={{fontSize: 18, color: global.darkBlue}}>
                {this.props.name}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default class Kittens extends React.Component {

  static navigationOptions = ({navigation}) => {
    const {state} = navigation;
    return {
      title: 'Kittens',
      headerStyle: {
        backgroundColor: '#9aceeb'
      }
      // tabBarIcon: ({tintColor}) => (
      //   <Text>Kittens</Text>
      // )
    };
  };

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({item}) => (
    <MyListItem {...item} navigate={this.props.navigation.navigate} screenProps={this.props.screenProps}/>
  );

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fafafa',
          justifyContent: 'center',
          flexWrap: 'wrap',
          width: Dimensions.get('window').width
        }}>
        <FlatList
          removeClippedSubviews={false}
          initialNumToRender={5}
          data={[]}
          // extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  columnHeaderText: {
    fontSize: 17,
    color: '#424242'
  },
  icon: {
    width: 26,
    height: 26
  },
  title: {
    fontSize: 42,
    fontFamily: 'System'
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'System',
    color: 'grey'
  }
});
