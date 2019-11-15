import React, { Component } from 'react';
import { SafeAreaView, Text, View, Dimensions, TextInput, TouchableOpacity, FlatList } from 'react-native';
import * as firebase from 'firebase';
import styles from '../styles';

export default class MessageScreen extends Component {

    static navigationOption = ({ navigation }) => {
        return {
            title: navigation.getParam('name', null),
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            person: {
                name: props.navigation.getParam('name'),
                email: props.navigation.getParam('email'),
            },
            textMessage: '',
            senderEmail: '',
            displayName: '',
            messageList: [],
        }
    }

    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;
        this.setState({ senderEmail: email, displayName });
        
        firebase.database().ref ('messages').child(displayName).child(this.state.person.name)
        .on('child_added', (value) => {
            this.setState((prevState) => {
                return {
                    messageList: [...prevState.messageList, value.val()]
                }
            })
        })
    }

    handleChange = key => val => {
        this.setState({ [key]: val })
        console.log('key', val)
    }

    sendMessage = async () => {
        if (this.state.textMessage.length > 0) {
            let msgId = firebase.database().ref('message').child(this.state.displayName).child(this.state.person.name).push().key;
            let updates = {};
            let message = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: this.state.displayName,
            }
            updates['messages/' + this.state.displayName + '/' + this.state.person.name + '/' + msgId] = message
            updates['messages/' + this.state.person.name + '/' + this.state.displayName + '/' + msgId] = message
            firebase.database().ref().update(updates);
            this.setState({ textMessage: '' });
        }
    }

    renderRow = ({ item }) => {
        return (
            <View style={{
                flexDirection: 'row',
                width: '60%',
                alignSelf: item.from === this.state.displayName ? 'flex-end' : 'flex-start',
                backgroundColor: item.from === this.state.displayName ? '#00897b' : '#7cb342',
                borderRadius: 5,
                marginBottom: 10,
            }}>
                <Text style={{ color: '#fff', padding: 7, fontSize: 16 }}>
                    {item.message}
                </Text>
                <Text style={{ color: '#eee', padding: 3, fontSize: 12 }}>
                    {item.time}
                </Text>

            </View>
        )
    }

    render() {
        let { height, width } = Dimensions.get('window');
        return (
            <SafeAreaView>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FlatList
                        style = {{padding: 10}}
                        data = {this.state.messageList}
                        renderItem = {this.renderRow}
                        keyExtractor= {(item, index) => index.toString ()}
                    />
                    <TextInput
                        style={styles.input}
                        value={this.state.textMessage}
                        placeholder="Type message..."
                        onChangeText={this.handleChange('textMessage')}
                    />
                    <TouchableOpacity onPress={this.sendMessage}>
                        <Text style={styles.btnText}>
                            Send
                    </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

