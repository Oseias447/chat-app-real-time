import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import User from '../../User';
import { db } from '../config';

export default class HomeScreen extends Component {
    
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Chats'
        }
    }

    state = {
        users: [],
        dbRef: db.ref('users'),
    }


    componentDidMount() {
        this.state.dbRef.on('child_added', (val) => {
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

    componentWillMount() {
        this.state.dbRef.off()
    }

    renderRow = ({ item }) => {
        return(
            <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('Chat', item)}
                style={{ padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1}}>
                <Text style={{ fontSize: 20}}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    render() {

        const { height } = Dimensions.get('window');
        return(
            <SafeAreaView>
                <FlatList
                    style={{ height }} 
                    data={this.state.users}
                    renderItem={this.renderRow}
                    keyExtractor={ (item)=> item.phone }
                />
            </SafeAreaView>
        )
    }
}