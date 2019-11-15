import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, LayoutAnimation } from 'react-native';

import * as firebase from 'firebase';

export default class ProfileScreen extends React.Component {

  state = {
    email: "",
    displayName: "",
    uid: ""
  };

  componentDidMount() {
    const { email, displayName, uid, } = firebase.auth().currentUser;
    this.setState({ email, displayName, uid });

    firebase.database().ref('Users/' + uid)
      .set({
        name: displayName,
        email: email
      });
  }

  signOutUser = () => {
    firebase.auth().signOut()
  }

  render() {
    LayoutAnimation.easeInEaseOut();

    return (
      <View style={styles.container}>
        <Text>Hi {this.state.email}!</Text>
        <Text>Hi {this.state.displayName}!</Text>
        <TouchableOpacity style={{ marginTop: 32 }} onPress={this.signOutUser}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
