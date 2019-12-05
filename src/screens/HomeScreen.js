import React, { Component } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, AsyncStorage, FlatList} from 'react-native';
import User from '../../User';
import styles from '../constants/styles';
import { db } from '../config';

export default class HomeScreen extends Component {
    
    static navigationOptions = {
        title: 'Chats'
    }

    state = {
        users: []
    }

    componentWillMount() {
        let dbRef = db.ref('users');
        dbRef.on('child_added', (val) => {
            let person = val.val();
            person.phone = val.key;

            if (person.phone === User.phone) {
                User.name = person.name
            } else {
                this.setState((prevState) => {
                    return {
                        users: [...prevState.users, person]
                    }
                });
            }
        });
    }

    _logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    rendeRow = ({ item }) => {
        return(
            <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('Chat', item)}
                style={{ padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1}}>
                <Text style={{ fontSize: 20}}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    render() {

        return(
            <SafeAreaView>
                <FlatList 
                data={this.state.users}
                renderItem={this.rendeRow}
                keyExtractor={ (item)=> item.phone }
                />
            </SafeAreaView>
        )
    }
}