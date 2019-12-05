import React from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import User from '../../User';
import styles from '../constants/styles';
import firebase from 'firebase';


export default class ProfileScreen  extends React.Component {
    
    static navigationOptions = {
        title: 'Profile'
    }

    state = {
        name: User.name
    }

    handleChange = key => val => {
        this.setState({[key]: val})
    }

    _logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    handleName = async () => {

        if (this.state.name.length < 3) {
            Alert.alert('Error', 'Por favor insere um nome válido');
        } else if (User.name !== this.state.name) {
            firebase.database().ref('users').child(User.phone).set({ name: this.state.name });
            User.name = this.state.name;
            Alert.alert('Success', 'Nome alterado com sucesso');
        }
    }

    render() {
        return(
            <SafeAreaView style={styles.container}>
                <Text style={{fontSize: 20}}>
                    {User.phone}
                </Text>
                <Text style={{fontSize: 20}}>
                    {User.name}
                </Text>

                <TextInput
                    style={styles.input}
                    value={this.state.name}
                    onChangeText={text => this.setState({ name: text})}
                />

                <TouchableOpacity onPress={this.handleName}>
                    <Text style={styles.btnText}>Alterar Nome</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this._logOut}>
                    <Text style={styles.btnText}>Sair</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}