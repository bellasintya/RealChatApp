import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, LayoutAnimation } from 'react-native';
import * as firebase from 'firebase';

export default class HomeScreen extends React.Component {

  state = {
    email: "",
    displayName: "",
    uid: "",
    users: [],
  };

  componentDidMount() {
    let dbRef = firebase.database().ref('Users');
    dbRef.on('child_added', (val) => {
      let person = val.val();
      person.email = val.key;
      if (person.email === this.state.email) {
        this.state.displayName = person.name
      } else {
        this.setState((prevState) => {
          return {
            users: [...prevState.users, person]
          }
        })
      }
    })
  }


  renderRow = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.contactList}
        onPress={() => this.props.navigation.navigate('Message', item)}
      >
        <Text style={{ fontSize: 15 }}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    LayoutAnimation.easeInEaseOut();

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.users}
          renderItem={this.renderRow}
          keyExtractor={(item) => item.uid}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  contactList: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
})
