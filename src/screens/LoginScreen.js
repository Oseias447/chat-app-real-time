import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { 
  Text, 
  Alert, 
  TouchableOpacity, 
  TextInput, 
  View 
} from 'react-native';
import { db } from '../config';

import User from '../../User';
import styles from '../constants/styles';


export default class LoginScreen extends Component {

  static navigationOptions = {
    header: null
  }

  state = {
    phone: '',
    name: ''
  }

  submitForm = async () => {
    if (this.state.phone.length < 10) {
      Alert.alert('Error', 'Telefone em Branco');
    } else if (this.state.name.length < 3) {
      Alert.alert('Error', 'Nome em Branco');
    } else {
      await AsyncStorage.setItem('userPhone', this.state.phone);
      User.phone = this.state.phone;
      db.ref('users/' + User.phone).set({ 
        name: this.state.name
      });
      this.props.navigation.navigate('App');
    }
  }

  render() {

    const { username, name } = this.state;

    return (
      <View style={styles.container}>
        <TextInput 
          placeholder="Número Telefone"
          keyboardType="number-pad"
          style={styles.input}
          value={this.state.phone}
          onChangeText={text => this.setState({ phone: text})}
        />
        <TextInput 
          placeholder="Nome"
          style={styles.input}
          value={this.state.name}
          onChangeText={text => this.setState({ name: text})}
        />

      <TouchableOpacity onPress={this.submitForm}>
        <Text style={styles.btnText}>Entrar</Text>
      </TouchableOpacity>
      </View>
    );
  }
}


